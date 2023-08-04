import { useEffect, useState } from "react";
import { useAccount, useContractReads } from "wagmi";
import { BigNumber } from "ethers";
import { Box } from "@mui/material";
import { CORE_CONTRACT_ADDRESS, MINT_CONTRACT_ADDRESS } from "config";
import GreatPass from "abi/GreatPass.json";
import GenArtABI from "abi/GenArt721Core.json";
import GenArt721MintABI from "abi/GenArt721Mint.json";
import MintingCountdown from "components/MintingCountdown";
import MintingProgress from "components/MintingProgress";
import MintingPrice from "components/MintingPrice";
import MintingButton from "components/MintingButton";
import MintingButtonPass from "./MintingButtonPass";
import MintingPricePass from "./MintingPricePass";
import MintingProgressPass from "./MintingProgressPass";
import { useTheme } from '@mui/material/styles';
import { formatEtherFixed } from "utils/numbers";
import axios, { AxiosError } from 'axios';
import { set } from "lodash";
import BurnButton from "./BurnButton";
const contractMintPassAddress = '0xf5114c0C4C7e3C7D61B345B79200c6CC415366eE';

//projectTokenInfo to get max minted so far CORE_CONTRACT_ADDRESS
//Goals for this
// contractMintPassAddress!!
// Check how many mintpasses they own, if none let them know to go buy one from secondary market
// READ- balanceOf using Address as owner from contractMintPassAddress
// Set the max they can mint to ether total mintpasses or max per burn mint (5 right now)
// See if our mintburner is approved to burn their mintpasses and if not approve it
// READ- isApprovedForAll using Address as and MINT_CONTRACT_ADDRESS as operator 
// WRITE- setApprovalForAll using MINT_CONTRACT_ADDRESS as operator and true as approved
// MINT_CONTRACT_ADDRESS!!
// Then allow burn minter to burn their mintpasses
// uint256 projectId, uint256[] memory tokenIds)
//   using projectId 0 and feeding in the tokenIds from the mintpasses they own
const BurnInterfacePass = () => {

  const [minted, setminted] = useState<any | number>(0);
  const [balanceOf, setbalanceOf] = useState<any | number>(0);
  const [isApprovedForAll, setisApprovedForAll] = useState<any | boolean>(false);
  const [isPaused, setisPaused] = useState<any | boolean>(true);
  const [isLocked, setisLocked] = useState<any | boolean>(true);
  const [isActive, setisActive] = useState<any | boolean>(true);
  const debouncedTokenId = 1;
  const { address, isConnected } = useAccount();
  const [UserMintPasses, setUserMintPasses] =  useState([] as any[])

  useEffect(() => {
    const fetchMintPasses = async () => {
      try {
        if (!address) return;
        const response = await axios.get(`http://localhost:3015/getids/${address}`);
        const UserTokensID = response.data;
        console.log(UserTokensID);
        setUserMintPasses(UserTokensID);
      } catch (error) {
  
      }
    };
  
    // Call the function immediately
    fetchMintPasses();
  
    // Then set up the interval to call it every 10 seconds
    const intervalId = setInterval(fetchMintPasses, 10000); // 10000 ms = 10 s
  
    // Return a cleanup function to be run when the component unmounts or when address changes
    return () => {
      clearInterval(intervalId);
    };
  }, [address]);
  
  const theme = useTheme();
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: CORE_CONTRACT_ADDRESS,
        abi: GenArtABI,
        functionName: "projectTokenInfo",
        args: [0],
      },
      {
        address: contractMintPassAddress,
        abi: GreatPass,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: contractMintPassAddress,
        abi: GreatPass,
        functionName: "isApprovedForAll",
        args: [address, MINT_CONTRACT_ADDRESS],
      },
      {
        address: CORE_CONTRACT_ADDRESS,
        abi: GenArtABI,
        functionName: "projectScriptInfo",
        args: [0],
      },
    ],
    watch: true,
  
    onSuccess(data) {
    const balance = data[1] as BigNumber;
    setbalanceOf(balance.toNumber());
    const projectTokenInfoData = data[0];
    const projectScriptInfoData = data[3];
    const invocations = (projectTokenInfoData as { invocations: BigNumber }).invocations;
    setminted(invocations.toNumber());
    const paused = (projectScriptInfoData as { paused: boolean }).paused;
    const locked = (projectScriptInfoData as { locked: boolean }).locked;
    const isActive = (projectTokenInfoData as { active: boolean }).active;
    setisPaused(paused);
    setisLocked(locked);
    setisActive(isActive);
    const approved = data[2] as Boolean;
    setisApprovedForAll(approved);
    },
  });

  if (!data || isLoading || isError) {
    console.log("data error? ");
    return null;
  }
  
  return (
    <Box
      display="flex"
      flexDirection={{
        xs: 'column',
        sm: 'column',
        md: 'column',
      }}
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      sx={{
        '& > :first-of-type".': {
          marginBottom: { xs: 1, sm: 1, md: 0 },
        },
      }}
    >
     
  <MintingProgressPass
        invocations={minted}
        maxInvocations={500}
        maxHasBeenInvoked={false}
        maxTx={Number(5)} pricePepe={""} priceWei={""} amountPhase1Cap={null} amountPhase2Cap={null} phase1Minted={null} phase2Minted={null}/>

   <BurnButton 
   projectId={'0'} 
   isConnected={isConnected} 
   isPaused={isPaused} 
   isLocked={isLocked} 
   isActive={isActive} 
   isApproved={isApprovedForAll} 
   mintpasses={UserMintPasses}/>
    </Box>
  );
  
};

export default BurnInterfacePass;
