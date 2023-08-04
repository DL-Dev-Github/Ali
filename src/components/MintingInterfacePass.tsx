import { useState } from "react";
import { useAccount, useContractReads } from "wagmi";
import { BigNumber } from "ethers";
import { Box } from "@mui/material";
import { CORE_CONTRACT_ADDRESS, MINT_CONTRACT_ADDRESS } from "config";
import GreatPass from "abi/GreatPass.json";
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

const contractAddress = '0x58497bD9D49C5064EC0361d93ACf0c7Cb1184A73';

const MintingInterfacePass = () => {
  const [openMintingEnabled, setOpenMintingEnabled] = useState<any | null>(null);
  const [openMintPrice, setOpenMintPrice] = useState<any | null>(null);
  const [claimPrice, setClaimPrice] = useState<any | null>(null);
  const [pepePrice, setPepePrice] = useState<any | null>(null);
  const [phase2Enabled, setPhase2Enabled] = useState<any | null>(null);
  const [phase1Enabled, setPhase1Enabled] = useState<any | null>(null);
  const [projectCurrentSupply, setProjectCurrentSupply] = useState<any | null>(null);
  const [projectMaxSupply, setProjectMaxSupply] = useState<any | null>(null);
  const [projectMaxMintPerTx, setProjectMaxMintPerTx] = useState<any | null>(null);
  const [usersTokensInPhase1, setusersTokensInPhase1] = useState<any | null>(null);
  const [usersTokensInPhase2, setusersTokensInPhase2] = useState<any | null>(null);
  const [usersTotalTokens, setusersTotalTokens] = useState<any | null>(null);
  const [usersClaimedPhase1Before, setusersClaimedPhase1Before] = useState<any | null>(null);
  const [usersClaimedPhase2Before, setusersClaimedPhase2Before] = useState<any | null>(null);
  const [amountPhase1Cap, setAmountPhase1Cap] = useState<any | null>(null);
const [amountPhase2Cap, setAmountPhase2Cap] = useState<any | null>(null);
const [phase1Minted, setPhase1Minted] = useState<any | null>(null);
const [phase2Minted, setPhase2Minted] = useState<any | null>(null);
const debouncedTokenId = 1;
  const { address, isConnected } = useAccount();
  const theme = useTheme();
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "usersClaimedPhase1Before",
        args: [address],
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "openMintingEnabled",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "openMintPrice",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "claimPrice",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "phase2Enabled",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "phase1Enabled",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "MAX_SUPPLY",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "MAX_MINT_PER_TX",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "totalMinted",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "whitelistedQuantitiesPhase1",
        args: [address],
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "whitelistedQuantitiesPhase2",
        args: [address],
      },
    
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "usersClaimedPhase2Before",
        args: [address],
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "AmountPhase1Cap",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "AmountPhase2Cap",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "Phase1Minted",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "Phase2Minted",
      },
      {
        address: contractAddress,
        abi: GreatPass,
        functionName: "openMintPriceToken",
      }
    ],
    watch: true,
  
    onSuccess(data) {
      setOpenMintingEnabled(data[1]);
      setOpenMintPrice(data[2]);
      setClaimPrice(data[3]);
      setPhase2Enabled(data[4]);
      setPhase1Enabled(data[5]);
      setProjectMaxSupply(data[6]);
      setProjectMaxMintPerTx(data[7]);  
      setProjectCurrentSupply(data[8]);
      setusersTokensInPhase1(data[9]);
    //  console.log("data[9] ", data[9]);
      setusersTokensInPhase2(data[10]);
     // console.log("data[10] ", data[10]);
      setusersClaimedPhase1Before(data[0]);
     // console.log("data[0] ", data[0]);
      setusersClaimedPhase2Before(data[11]);
      //console.log("data[11] ", data[11]);
      setAmountPhase1Cap((data[12] as BigNumber).toString());
     // console.log("data[12] ", data[12]);
      setAmountPhase2Cap((data[13] as BigNumber).toString());
     // console.log("data[13] ", data[13]);
      setPhase1Minted((data[14] as BigNumber).toString());
    //  console.log("data[14] ", data[14]);
      setPhase2Minted((data[15] as BigNumber).toString());
     // console.log("data[15] ", data[15]);
      setPepePrice(data[16]);
    },
  });

  if (!data || isLoading || isError) {
    console.log("data error? ");
    return null;
  }
  function numberWithCommas(x: { toString: () => string; }) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  console.log("data? ", data);
  const invocations = projectCurrentSupply;
  const maxInvocations = projectMaxSupply;
  const currencySymbol = 'Ξ';
  const isPaused = phase1Enabled;
  const maxHasBeenInvoked = projectCurrentSupply >= projectMaxSupply?.toBigInt();
  console.log("maxHasBeenInvoked? ", maxHasBeenInvoked);
  const maxTx  =  projectMaxMintPerTx ? BigInt(projectMaxMintPerTx) : BigInt(0);
  const token1 = usersTokensInPhase1 ? BigInt(usersTokensInPhase1).toString() : '0';
  const token2 = usersTokensInPhase2 ? BigInt(usersTokensInPhase2).toString() : '0';
  const totalTokens = parseInt(token1) + parseInt(token2)
  console.log("token1? ", token1);
  console.log("token2? ", token2);
  console.log("totalTokens? ", totalTokens);
  const currentPriceWei = phase1Enabled
    ? claimPrice
    : openMintingEnabled
    ? openMintPrice
    : phase2Enabled
    ? claimPrice
    : "69000000000000000";
  const startPriceWei = currentPriceWei.toString();
  const endPriceWei = currentPriceWei;
  const currentPricePepe= phase1Enabled
    ? pepePrice
    : openMintingEnabled
    ? openMintPrice
    : phase2Enabled
    ? pepePrice
    : "80000000000000000000000000";
    const formattedPricePepe= numberWithCommas(formatEtherFixed(currentPricePepe,0));
console.log("currentPricePepe? ", formatEtherFixed(currentPricePepe,3));
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
  invocations={invocations}
  maxInvocations={maxInvocations}
  maxHasBeenInvoked={maxHasBeenInvoked}
  maxTx={Number(maxTx)}
  priceWei={formatEtherFixed(currentPriceWei,3)}
  pricePepe={formattedPricePepe}
  amountPhase1Cap={amountPhase1Cap}
  amountPhase2Cap={amountPhase2Cap}
  phase1Minted={phase1Minted}
  phase2Minted={phase2Minted}
/>
<MintingButtonPass
        projectId="1"
        priceWei={currentPriceWei}
        currencySymbol={currencySymbol}
        phase1Enabled={phase1Enabled}
        phase2Enabled={phase2Enabled}
        openMintingEnabled={openMintingEnabled}
        scriptAspectRatio={1}
        projectMaxMintPerTx={projectMaxMintPerTx}
        usersTokensInPhase1={Number(token1)}
        usersTokensInPhase2={Number(token2)}
        usersTotalTokens={Number(totalTokens)}
        
        userClaimedPhase1Before={usersClaimedPhase1Before}
        userClaimedPhase2Before={usersClaimedPhase2Before}
        maxHasBeenInvoked = {maxHasBeenInvoked}
        pricePepe={currentPricePepe}
      />
  
    </Box>
  );
  
};

export default MintingInterfacePass;
