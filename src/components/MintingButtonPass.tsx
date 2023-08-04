import { useEffect, useState } from "react"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractReads } from "wagmi"
import { utils, BigNumber } from "ethers"
import {
  Box,
  Typography,
  Modal,
  Button,
  ButtonGroup
} from "@mui/material"
import {  MULTIPLY_GAS_LIMIT } from "config"
import { multiplyBigNumberByFloat, formatEtherFixed } from "utils/numbers"
import GreatPass from "abi/GreatPass.json"
import TokenView from "components/TokenView"
import MintingButtonEnabledPass from "components/MintingButtonEnabledPass"
import useWindowSize from "hooks/useWindowSize"
import Confetti from "react-confetti";
import { Backdrop, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

import ERC20_ABI from "abi/erc20.json";

import axios, { AxiosError } from 'axios';
import { CustomConnectButton2 } from "./CustomConnectButton2"
import e from "express"
interface Props {

  projectId: string, // Dont need this projectId
  priceWei: BigNumber
  currencySymbol?: string,

  phase1Enabled?: boolean,
  phase2Enabled?: boolean,
  openMintingEnabled?: boolean,
  artistCanMint?: boolean,
  anyoneCanMint?: boolean,
  scriptAspectRatio?: number // Dont need this harcore aspect ratio to 1:1
  usersTokensInPhase1?: number,
  usersTokensInPhase2?: number,
  usersTotalTokens?: number,
  projectMaxMintPerTx?: number,
  userClaimedPhase1Before?: boolean,
  userClaimedPhase2Before?: boolean,
  maxHasBeenInvoked?: boolean,
  pricePepe?: string
}

//const PepecontractAddress = '0x58497bD9D49C5064EC0361d93ACf0c7Cb1184A73';

const MintingInteractionPass = ({ 
 
  priceWei,
  currencySymbol,

  phase1Enabled,
  phase2Enabled,
  openMintingEnabled,
  artistCanMint,
  anyoneCanMint,
  usersTokensInPhase1,
  usersTokensInPhase2,
  usersTotalTokens,
  projectMaxMintPerTx,
  userClaimedPhase1Before,
  userClaimedPhase2Before,
  maxHasBeenInvoked,
  pricePepe
  }: Props) => {
    // old contract f6fB1AbDc7E361e11420e12cca7E27251b801385 58497bD9D49C5064EC0361d93ACf0c7Cb1184A73
const { width, height } = useWindowSize();
  const windowSize = useWindowSize()
  const [dialog, setDialog] = useState("")
  const [mintingTokenId, setMintingTokenId] = useState<any | null>(null)
  const [mintingPreview, setMintingPreview] = useState(false)
  const handleMintingPreviewOpen = () => setMintingPreview(true)
  const handleMintingPreviewClose = () => setMintingPreview(false) //refresh page when this happens or reload data from contract
  const [proofData, setProofData] = useState<ProofData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const contractAddress = '0x58497bD9D49C5064EC0361d93ACf0c7Cb1184A73';
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPepe, setModalOpenPepe] = useState(false);
  //handlePepeRefreash
  useEffect(() => {
    if (!modalOpenPepe) {
      handlePepeRefreash();
    }
  }, [modalOpenPepe]);
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [usePepe, setUsePepe] = useState(false);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value as string);
   if(event.target.value  !== 'PEPE'){
     setUsePepe(false);
     setApprovalRequired(false);
     console.log("use eth");
   }
   else{
    let balanceOfBigNumber = BigNumber.from(balanceOf);
let allowanceBigNumber = BigNumber.from(allowance);
      setUsePepe(true);
      let pricePepe_ = BigNumber.from(pricePepe).mul(numTokens);
      console.log("pricePepe_:" + pricePepe_);
      if(BigNumber.from(pricePepe_).gt(BigNumber.from(balanceOfBigNumber))){
     // setApprovalRequired(true);
      console.log(" use it 1 " + balanceOfBigNumber +"  < " + pricePepe_);
      }
      else if( BigNumber.from(pricePepe_).gt(BigNumber.from(allowanceBigNumber)) ){
      //  setApprovalRequired(true);
        console.log(" use it 2" + allowanceBigNumber +"  < " + pricePepe_);
        }
      else{
       // setApprovalRequired(false);
        console.log("dont use it");
      }
      console.log("use pepe");
   }
  };
  interface ProofData {
    proof: string[];
    allowedQuantity: string;
    phase: number;
  }
  const { address, isConnected } = useAccount();
  const [isLoadingProofData, setIsLoadingProofData] = useState(true);
  const [numTokens, setNumTokens] = useState(1);
  const realprice = BigNumber.from(numTokens).mul(priceWei);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (mintingPreview) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setNumTokens(1);
        fetchProofData();
      }, 5000); // Set the duration of confetti in milliseconds (5 seconds)
    }
  }, [mintingPreview]);
  
  const handleIncreaseTokens = () => {
    setNumTokens((prevValue) => {
      let maxAllowedTokens;
      let SplitTokens=0;
    //  const total =  (usersTokensInPhase1?+(usersTokensInPhase2?? 0):0);
      if (openMintingEnabled) {
        maxAllowedTokens = projectMaxMintPerTx;
      } 
      
     else if (phase1Enabled && !phase2Enabled) {
      maxAllowedTokens = userClaimedPhase1Before
      ? usersTokensInPhase1
      : (parseInt(proofData?.[0]?.allowedQuantity ?? "0", 10));
      } 
      else if (phase2Enabled && !phase1Enabled) {
      //const total =  (usersTokensInPhase1?+(usersTokensInPhase2?? 0):0);
console.log(usersTotalTokens+"phase2Enabled and user claimed:" + userClaimedPhase2Before )
        maxAllowedTokens = userClaimedPhase2Before ? usersTotalTokens : (parseInt(proofData?.[1]?.allowedQuantity ?? "0", 10));
      } 
      else    {
        if(!userClaimedPhase1Before ){
          SplitTokens +=(parseInt(proofData?.[0]?.allowedQuantity ?? "0", 10));
        }
        else{
          SplitTokens += usersTokensInPhase1 ? usersTokensInPhase1 : 0;

        }
        if(!userClaimedPhase2Before ){
          SplitTokens += (parseInt(proofData?.[1]?.allowedQuantity ?? "0", 10));
        }
        else{
          SplitTokens += usersTokensInPhase2 ? usersTokensInPhase2 : 0;

        }
        maxAllowedTokens = SplitTokens;
        usersTotalTokens = maxAllowedTokens;
       // maxAllowedTokens = userClaimedPhase1Before || userClaimedPhase2Before
        //  ? usersTotalTokens
         // : (parseInt(proofData?.[0]?.allowedQuantity ?? "0", 10)) +
         //   (parseInt(proofData?.[1]?.allowedQuantity ?? "0", 10));
        console.log(usersTotalTokens+" All enabled  and user claimed:" + userClaimedPhase2Before )
      }
      
      const cappedMaxAllowedTokens = Math.min(maxAllowedTokens || 0, projectMaxMintPerTx || Infinity);
      
      const requiredAllowance = BigNumber.from(pricePepe).mul(prevValue < cappedMaxAllowedTokens ? prevValue + 1 : prevValue);
      setRequiredAllowance(requiredAllowance);
      if(BigNumber.from(allowance)>=requiredAllowance){ 
        setApprovalRequired(false);
       console.log("YOUR GOOD "+ requiredAllowance +"  >= " + allowance);
      }
      else{
        setApprovalRequired(true);
        console.log("NEED APPROVAL:" + requiredAllowance +"  < " + allowance);
      }
      return prevValue < cappedMaxAllowedTokens ? prevValue + 1 : prevValue;
    });
  };
// if user toktal tokens are zero then we use a react effect to set a canmint bool to false
const [canMintz, setCanMintz] = useState(false);

useEffect(() => {
  let kek = usersTotalTokens ? usersTotalTokens : 0;
  if (kek > 0) {
    setCanMintz(true);
  } else {
    setCanMintz(false);
  }
 if(!userClaimedPhase1Before || !userClaimedPhase2Before){
   setCanMintz(true);
 }
}, [usersTotalTokens]);

 // usersTotalTokens
  let kekTokensPhase1 = usersTokensInPhase1 ? usersTokensInPhase1: 0 ;
  let kekTokensPhase2 = usersTokensInPhase2 ? usersTokensInPhase2 : 0 ;
  let leftMintsPhase1=0;
  let leftMintsPhase2=0;
  if(kekTokensPhase1<=0 && userClaimedPhase1Before && phase1Enabled ){

    leftMintsPhase1 = kekTokensPhase1;
  }
  else{
  leftMintsPhase1 = kekTokensPhase1;
  }

  if(kekTokensPhase2<=0 && userClaimedPhase2Before && phase2Enabled ){

    leftMintsPhase2 = kekTokensPhase2;
  }

  const totalKek= leftMintsPhase1+leftMintsPhase2;
  let CanMint=true;
  if( !openMintingEnabled && totalKek<=0){
    CanMint=false;
  }
  if(phase1Enabled && phase2Enabled){
   let lol = (parseInt(proofData?.[0]?.allowedQuantity ?? "0", 10));
   let kek = (parseInt(proofData?.[1]?.allowedQuantity ?? "0", 10));
   if(lol+kek>0){
    
    CanMint=true;}
  }
 // let noMints = usersTotalTokens;
  const handleDecreaseTokens = () => {
    
    setNumTokens((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue));
    let numToken = numTokens - 1;
    if(numToken<1){
      numToken=1;
    }
    const requiredAllowance = BigNumber.from(pricePepe).mul(numToken);
    setRequiredAllowance(requiredAllowance);
    if(BigNumber.from(allowance)>=requiredAllowance){ 
      setApprovalRequired(false);
     console.log("YOUR GOOD "+ requiredAllowance +"  >= " + allowance);
    }
    else{
      setApprovalRequired(true);
      console.log("NEED APPROVAL:" + requiredAllowance +"  < " + allowance);
    }


  };
  useEffect(() => {
    if (address) {
      fetchProofData();
    }
  }, [address]);
  //This is used to get the proof for the claim function
  //It comes from our backend
  //here is what it looks like when we get a response:
  /*
  [
    {
      proof: [
        '0x0ec4fc21647ed2093532464c7c9f651b4f149c149201a33e58d75faa285951ba'
      ],
      allowedQuantity: '4',
      phase: 1
    },
    {
      proof: [
        '0x0ec4fc21647ed2093532464c7c9f651b4f149c149201a33e58d75faa285951ba'
      ],
      allowedQuantity: '4',
      phase: 2
    }
  ]
  */
  const [transactionComplete, setTransactionComplete] = useState(false);

  const [balanceOf, setBalanceOf] = useState<any | null>(null);
const [allowance, setAllowance] = useState<any | null>(null);
const [requiredAllowance, setRequiredAllowance] = useState<any | null>(null);
//old 97ff91bd7d2d6298e9ad805a17d301e68eb2f61d  6982508145454ce325ddbe47a25d4ec3d2311933
  const { config: approvePepeConfig,     error: prepareErrorApprove,
    isError: isPrepareErrorApprove, } = usePrepareContractWrite({
    address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    abi: ERC20_ABI,
    functionName: "approve",
    args: [
      '0x58497bD9D49C5064EC0361d93ACf0c7Cb1184A73',
      BigNumber.from(pricePepe).mul(numTokens)
    
    ],  
   
  });

  const handleApproval = () => {
    approvePepe?.();
  };

  const { write: approvePepe, data: dater } = useContractWrite({ ...approvePepeConfig,
    onSuccess(dater) {
      setModalOpenPepe(true);
    }}
    );

  const { data: contractReadData   } = useContractReads({
    contracts: [
      {
        address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address], // Replace 'account' with the connected user's Ethereum address
      },
      {
        address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, contractAddress],
      },
      // Include other contracts here if needed
    ],
    watch: true,
    
    onSuccess(data) {
      const requiredAllowance = BigNumber.from(pricePepe).mul(numTokens);
      setRequiredAllowance(requiredAllowance);
      setBalanceOf(data[0]);
      setAllowance(data[1]);
      //console.log("LOLOL requiredAllowance "+requiredAllowance);
     // console.log("LOLOL setBalanceOf "+data[0]);
     // console.log("LOLOL setAllowance "+ data[1]);
      if(BigNumber.from(data[1])>=requiredAllowance){ 
        setApprovalRequired(false);
       //console.log("LOLOL setApprovalRequired false" + requiredAllowance + " and "  + BigNumber.from(data[1]) + " and " + BigNumber.from(data[0]));
      }
      else{
        setApprovalRequired(true);
        if(BigNumber.from(data[1])<=requiredAllowance){

        }
        if(BigNumber.from(data[1])>=requiredAllowance){
          
        }
        //console.log("NEED APPROVAL requiredAllowance:" + requiredAllowance + " and Allowance"  + BigNumber.from(data[1]) + " and BalanceOf:" + BigNumber.from(data[0]));
  
      }
      

    },
  });
  useEffect(() => {
    if (transactionComplete) {
      // Do something here to trigger a re-read of the contract data
      // This might be calling a function provided by the library you're using, or it might involve setting some state
      // that results in a new call to useContractReads. Without more details about the library and your code, it's hard to give a specific suggestion.
      
      setTransactionComplete(false); // Reset transactionComplete to false after triggering the re-read
    }
  }, [transactionComplete]);
  
  const fetchProofData = async () => {
    const keker =[
      {
        proof: [
          '0x0'
        ],
        allowedQuantity: '0',
        phase: 1
      },
      {
        proof: [
          '0x0'
        ],
        allowedQuantity: '0',
        phase: 2
      }
    ];
    setLoading(true);
    setError(null);
    setIsLoadingProofData(true);
    try {
      const response = await axios.get<{ results: ProofData[] }>(`https://api.muhammadalinft.io/proofsAndAllowedQuantities?address=${address}`);
      if(response.data.results.length<=1){
        setProofData(keker);
      

        console.log(response.data.results);
      }
      else{
      setProofData(response.data.results);
      }
      console.log(response.data.results);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
      setIsLoadingProofData(false);
    }
  };

  const { config ,     error: prepareError,
    isError: isPrepareError, } = usePrepareContractWrite({
    address: contractAddress,
    abi: GreatPass,
    functionName: "claim",
   
    overrides: {
      value: usePepe ? 0 : realprice
    },
    args: [
      numTokens,
      proofData?.[0]?.allowedQuantity
        ? BigNumber.from(proofData[0].allowedQuantity)
        : BigNumber.from(0),
      proofData?.[1]?.allowedQuantity
        ? BigNumber.from(proofData[1].allowedQuantity)
        : BigNumber.from(0),
      proofData?.[0]?.proof ?? [],
      proofData?.[1]?.proof ?? [],
      usePepe
    ]
  });
  
  const { config: openMintConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: GreatPass,
    functionName: "openMint",
  
    overrides: {
      value: usePepe ? 0 : realprice
    },
    args: [
      numTokens,
      usePepe
    ]
  });
  
  const { data: openMintData, isError: openMintIsError, isLoading: openMintIsLoading, write: openMintWrite } = useContractWrite({
    ...openMintConfig,
    
    request: openMintConfig.request ? {
      data: openMintConfig.request?.data,
      from: openMintConfig.request?.from,
      gasLimit: multiplyBigNumberByFloat(openMintConfig.request?.gasLimit, MULTIPLY_GAS_LIMIT),
      to: openMintConfig.request?.to,
      value: openMintConfig.request?.value
    } : undefined,
    
    onSuccess(data) {
      setModalOpen(true);
    },
    onError (error) {
     console.log("KEKEKEK"+error);
     setApprovalRequired(true);
    },
    onSettled(data, error, variables, context) {
      if(openMintWrite){
     setApprovalRequired(false);
      }
      else{
      setApprovalRequired(true);
      }
    },
  });
  
  



  let customRequest = config.request ? {
    data: config.request?.data,
    from: config.request?.from,
    gasLimit: multiplyBigNumberByFloat(config.request?.gasLimit, MULTIPLY_GAS_LIMIT),
    to: config.request?.to,
    value: config.request?.value
  } : undefined

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    request: customRequest,
    
    onSuccess(data) {
      setModalOpen(true);
    }
  })
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      let tokenId;
      if(!usePepe){
        tokenId = data?.logs[0]?.topics[3]
      }
      else{
        tokenId = data?.logs[2]?.topics[3]
      }
      if (tokenId) {  
        setMintingTokenId(parseInt(tokenId, 16).toString())
        handleMintingPreviewOpen()
      }
      setModalOpen(false);
    }
  })
  const waitForPepeTransaction = useWaitForTransaction({
    hash: dater?.hash,
    confirmations: 2,
    onSuccess(data) {
     
      setModalOpenPepe(false);
      setTransactionComplete(true);
    
      const requiredAllowance = BigNumber.from(pricePepe).mul(numTokens);
      setRequiredAllowance(requiredAllowance);
    //  setApprovalRequired(false);
      handlePepeRefreash();
    //  const tmp = numTokens;
     // setNumTokens(1);
      //setNumTokens(tmp);
      //  setNumTokens((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue));
      //const [numTokens, setNumTokens] = useState(1);
      
      //setBalanceOf(requiredAllowance);
      //setAllowance(requiredAllowance);
    // how can i use  contractReadData here?
    }
  })
  const waitForOpenMintTransaction = useWaitForTransaction({
    hash: openMintData?.hash,
    confirmations: 1,
    onSuccess(data) {
      let tokenId;
      if(!usePepe){
        tokenId = data?.logs[0]?.topics[3]
      }
      else{
        tokenId = data?.logs[2]?.topics[3]
      }
      if (tokenId) {
        setMintingTokenId(parseInt(tokenId, 16).toString());
        handleMintingPreviewOpen();
      }
      setModalOpen(false);
    }
  });
  const [approvalRequired, setApprovalRequired] = useState(false);
  //Lets turn this into a function
 //openMintWrite
   const handlePepeRefreash = async () => {
  //  const tmp = numTokens;
   // setNumTokens(1);
   //setNumTokens(tmp);
  // const requiredAllowance = BigNumber.from(pricePepe).mul(numTokens);
 // / setRequiredAllowance(requiredAllowance);
  // setBalanceOf(requiredAllowance);
   //setAllowance(requiredAllowance);
  }
  
const allDisabled= !phase1Enabled && !phase2Enabled && !openMintingEnabled;
let mintedOut = maxHasBeenInvoked? maxHasBeenInvoked : false;
  return (
    <>
       { isConnected && !allDisabled && (
      <>
        
        {(phase1Enabled || phase2Enabled)  && CanMint && !mintedOut && !openMintingEnabled&&  (
  <>
  <Box>
 
   
    <ButtonGroup sx={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Box margin={1}> 
       <Typography variant="body1" marginBottom={1}>Mint Amount:</Typography>  
  <Button
    variant="outlined"
    sx={{ textTransform: "none", marginRight: '-0.0vw', zIndex: 3 }}
    
    color="secondary"
    style={{ fontSize: '1rem', color: "white" }}
    onClick={handleDecreaseTokens}
  >
    -
  </Button>
  <Button
    variant="outlined"
    color="secondary"
    
    sx={{ textTransform: "none", zIndex: 2}}
    style={{ fontSize: '1rem', color: "white" }}
  >
    {numTokens}
  </Button>
  <Button
    variant="outlined"
    sx={{ textTransform: "none", marginLeft: '-0.0  vw', zIndex: 3 }}
    color="secondary"
    onClick={handleIncreaseTokens}
    style={{ fontSize: '1rem', color: "white" }}
  >
    +
  </Button>
  </Box>



  <Box margin={1}>
  <Typography variant="body1"   marginBottom={0.5}  >Currency:</Typography>  
    <FormControl variant="outlined" size="small">

  <Select
    native
    value={selectedCurrency}
    onChange={handleCurrencyChange}
    label="Currency"
    inputProps={{
      name: 'currency',
      id: 'outlined-currency-native-simple',
    }}
    sx={{
      color: 'white',
      outline: 'none',
      '& .MuiSvgIcon-root': {
        fill: 'white',
        outline: 'none',
      },
      '&:focus': {
        backgroundColor: 'black',
        outline: 'none',
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          backgroundColor: 'black',
          color: 'black',
          outline: 'none',
        },
      },
    }}
  >
<option value="ETH" style={{fontSize:"0.9rem", backgroundColor: 'black', color: 'white' }}>
  ETH
</option>
<option value="PEPE" style={{fontSize:"0.9rem", backgroundColor: 'black', color: 'white' }}>
  PEPE
</option>

  </Select>
</FormControl>
  </Box>

<Box margin={0.5} marginTop={3.5}>
{approvalRequired && selectedCurrency === "PEPE" && handleApproval && canMintz && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleApproval}
          sx={{ textTransform: "none" }}
          style={{ fontSize: "1.0rem" }}
        >
          APPROVE
        </Button>
      )}
      {!approvalRequired && selectedCurrency === "PEPE" && write && canMintz &&  (
      <Button
        variant="contained"
        color="primary"
        
        onClick={async () => {
          write && write?.();
         
        }}
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
      {selectedCurrency !== "PEPE" && write && canMintz &&(
      <Button
        variant="contained"
        color="primary"
          
        onClick={async () => {
          write && write?.();
         
        }}
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
      {!canMintz &&(
      <Button
        variant="contained"
        color="primary"
          
      
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT SOON!
      </Button>)}
      {canMintz &&  !write && selectedCurrency !== "PEPE" &&(
      <Button
        variant="outlined"
        color="error"
          
      
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
  </Box>
  </ButtonGroup>
  </Box>
</>

)}
{  isConnected && openMintingEnabled && !mintedOut && (
  <>
  <Box>
 
   
    <ButtonGroup sx={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Box margin={1}> 
       <Typography variant="body1" marginBottom={1}>Mint Amount:</Typography>  
  <Button
    variant="outlined"
    sx={{ textTransform: "none", marginRight: '-0.0vw', zIndex: 3 }}
    
    color="secondary"
    style={{ fontSize: '1rem', color: "white" }}
    onClick={handleDecreaseTokens}
  >
    -
  </Button>
  <Button
    variant="outlined"
    color="secondary"
    
    sx={{ textTransform: "none", zIndex: 2}}
    style={{ fontSize: '1rem', color: "white" }}
  >
    {numTokens}
  </Button>
  <Button
    variant="outlined"
    sx={{ textTransform: "none", marginLeft: '-0.0  vw', zIndex: 3 }}
    color="secondary"
    onClick={handleIncreaseTokens}
    style={{ fontSize: '1rem', color: "white" }}
  >
    +
  </Button>
  </Box>



  <Box margin={1}>
  <Typography variant="body1"   marginBottom={0.5}  >Currency:</Typography>  
    <FormControl variant="outlined" size="small">

  <Select
    native
    value={selectedCurrency}
    onChange={handleCurrencyChange}
    label="Currency"
    inputProps={{
      name: 'currency',
      id: 'outlined-currency-native-simple',
    }}
    sx={{
      color: 'white',
      outline: 'none',
      '& .MuiSvgIcon-root': {
        fill: 'white',
        outline: 'none',
      },
      '&:focus': {
        backgroundColor: 'black',
        outline: 'none',
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          backgroundColor: 'black',
          color: 'black',
          outline: 'none',
        },
      },
    }}
  >
<option value="ETH" style={{fontSize:"0.9rem", backgroundColor: 'black', color: 'white' }}>
  ETH
</option>
<option value="PEPE" style={{fontSize:"0.9rem", backgroundColor: 'black', color: 'white' }}>
  PEPE
</option>

  </Select>
</FormControl>
  </Box>

<Box margin={0.5} marginTop={3.5}>
{approvalRequired && selectedCurrency === "PEPE" && handleApproval && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleApproval}
          sx={{ textTransform: "none" }}
          style={{ fontSize: "1.0rem" }}
        >
          APPROVE
        </Button>
      )}
      {!approvalRequired && openMintWrite  &&  selectedCurrency === "PEPE" && (
      <Button
        variant="contained"
        color="primary"
        
        onClick={async () => {
          
          openMintWrite && openMintWrite?.();
         
        }}
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
      {!approvalRequired && !openMintWrite && selectedCurrency === "PEPE" && (
       <Button
       variant="contained"
       color="primary"
       onClick={handleApproval}
       sx={{ textTransform: "none" }}
       style={{ fontSize: "1.0rem" }}
     >
       APPROVE
     </Button>)}
      {selectedCurrency !== "PEPE" && openMintWrite && (
      <Button
        variant="contained"
        color="primary"
          
        onClick={async () => {
          openMintWrite && openMintWrite?.();
         // write && write?.();
        }}
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
      
      { !openMintWrite && selectedCurrency !== "PEPE" &&(
      <Button
        variant="outlined"
        color="error"
          
      
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT
      </Button>)}
  </Box>
  </ButtonGroup>
  </Box>
</>

)}

       
      </>
    )}
    {   
     isConnected && allDisabled && 
     (
    <Button variant="contained"
    color="primary" size="large" style={{ fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>
            MINT COMING SOON!
          </Button>
     )
     } 
      {   
     isConnected && !CanMint && !allDisabled &&
     (
    <Button variant="contained"
    color="primary" size="large" style={{ fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>
                  MINT COMING SOON!
          </Button>
     )
     } 
      {   
     mintedOut &&
     (
      <a href="https://opensea.io/collection/the-greatest-muhammad-ali-x-zeblocks-mint-pass" 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ textDecoration: 'none' }}>
     <Button variant="contained" color="primary" size="large" style={{ fontSize: '1.9rem', padding: '0.85rem 1.65rem' }}>
       SOLD OUT! 
       CHECK OPENSEA!
     </Button>
   </a>
   
     )
     } 
     {
         !isConnected &&
        (
          <CustomConnectButton2
          />
        )
      }
      <Box marginTop={1}>
        <Typography fontStyle="italic">
          {dialog}
        </Typography>
      </Box>
      {showConfetti  && (
      <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999
      }}
    >
      <Confetti width={width} height={height} />
    </div>
    )}
<Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#000",
        backdropFilter: "blur(3px)",
      }}
      open={modalOpen}
    >
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {xs: '95%', sm: '95%', md:'50%', lg: '50%'},
            border: "none",
            boxShadow: 10,
            padding: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <Typography id="modal-modal-title" align="center" textAlign="center" variant="h1" fontSize="38px" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} marginBottom={1}>
             Transaction pending...
    </Typography>
            {/* Add your centered GIF here */}
            <img
              src="/media/loading.gif"
              alt="Loading"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Modal>
    </Backdrop>

    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#000",
        backdropFilter: "blur(3px)",
      }}
      open={modalOpenPepe}
    >
      <Modal
        open={modalOpenPepe}
        onClose={() => setModalOpenPepe(false)  
          
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {xs: '95%', sm: '95%', md:'50%', lg: '50%'},
            border: "none",
            boxShadow: 10,
            padding: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <Typography id="modal-modal-title" align="center" textAlign="center" variant="h1" fontSize="38px" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} marginBottom={1}>
             Approving Pepe...
    </Typography>
            {/* Add your centered GIF here */}
            <img
              src="/media/loading.gif"
              alt="Loading"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Modal>
    </Backdrop>

      <Modal
  open={mintingPreview}
  onClose={handleMintingPreviewClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs: '95%', sm: '95%', md:'50%', lg: '50%'},
    bgcolor: "black",
    border: "none",
    boxShadow: 10,
    padding: 5,
  }}
>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography id="modal-modal-title" variant="h1" fontSize="28px"  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      The Greatest: Muhammad Ali x Zeblocks Mint Pass
    </Typography>
    <Box marginTop={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <a
        href={`https://opensea.io/assets/ethereum/${contractAddress}/${mintingTokenId}`}
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/media/alimintpass.png" alt="Ali Mint Pass" style={{width: '100%', height: '100%'}} />
      </a>
    </Box>
  </Box>
</Box>

</Modal>

    </>
  )
}

export default MintingInteractionPass