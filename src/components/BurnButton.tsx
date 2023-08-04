import { useEffect, useState } from "react"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from "wagmi"
import { utils, BigNumber } from "ethers"
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Button,
  ButtonGroup,
  FormControl,
  Select
} from "@mui/material"
import { MINT_CONTRACT_ADDRESS, MULTIPLY_GAS_LIMIT } from "config"
import { multiplyBigNumberByFloat, formatEtherFixed } from "utils/numbers"
import GenArt721MintABI from "abi/GenArt721Mint.json"
import TokenView from "components/TokenView"
import MintingButtonEnabled from "components/MintingButtonEnabled"
import useWindowSize from "hooks/useWindowSize"
import Confetti from "react-confetti"

interface Props {
  projectId: string,
  isConnected: boolean,
  isPaused: boolean,
  isLocked: boolean,
  isActive: boolean,
  isApproved: boolean,
  mintpasses: any
}

const BurnButton = ({ 
    projectId,
    isConnected,
    isPaused,
    isLocked,
    isActive,
    isApproved,
    mintpasses
  }: Props) => {
    const [BurnList, setBurnList] = useState<any | any>(mintpasses);
  const { address } = useAccount();
  const windowSize = useWindowSize()
  const [dialog, setDialog] = useState("")
  const [mintingTokenId, setMintingTokenId] = useState<any | null>(null)
  const [mintingPreview, setMintingPreview] = useState(false)
  const [numTokens, setNumTokens] = useState<any | any>(mintpasses.length>5 ? 5 : 0);
  const handleMintingPreviewOpen = () => setMintingPreview(true)
  const handleMintingPreviewClose = () => setMintingPreview(false)
  const { width, height } = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const { config } = usePrepareContractWrite({
    address: MINT_CONTRACT_ADDRESS,
    abi: GenArt721MintABI,
    functionName: "purchaseManyWithBurn",
    args: [
      BigNumber.from(projectId),
      BurnList.lenght===1? [BurnList]: BurnList
    ]
    
  }
  
  ) 
  const handleIncreaseTokens = () => {
   // let maxAllowedTokens =5;
let ourTokens = mintpasses.length;
     setNumTokens((prevValue: number) => (prevValue < ourTokens ? prevValue + 1 : prevValue));
    let numToken = numTokens + 1;
    if(numToken>ourTokens){
      numToken=ourTokens;
      setNumTokens(ourTokens);
    }

  };
  useEffect(() => {
    if (address) {
     // fetchProofData();
    }
  }, [address]);

  const handleDecreaseTokens = () => {
    
    setNumTokens((prevValue: number) => (prevValue > 1 ? prevValue - 1 : prevValue));
    let numToken = numTokens - 1;
    if(numToken<1){
      numToken=1;
    }
   
  };
  useEffect(() => {
    if (address) {
    //Rebuild the token list to burn

    }
  }, [address]);
  
  //let BurnList = [];

  useEffect(() => {
    //setBurnList([]);
    
    let ourTokens = mintpasses.length;
    if(ourTokens>5){
    ourTokens=5;
    }
    let numToken = numTokens;
    let tmpBurnList = [];
 
    for (let i = 0; i < numTokens; i++) {
        tmpBurnList.push(mintpasses[i]);
    } 
  
    setBurnList(tmpBurnList);
    console.log("tmpBurnList" , tmpBurnList);
  }, [numTokens]);
  
  useEffect(() => {
    console.log("BurnList" ,BurnList);
    console.log(numTokens+ " was the number and the tmpBurnList is:and Burnlist is:" + BurnList.length)
  }, [BurnList]);




  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (mintingPreview) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
       // setNumTokens(1);
       // fetchProofData();
      }, 5000); // Set the duration of confetti in milliseconds (5 seconds)
    }
  }, [mintingPreview]);
  
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
      let tokenId = data?.logs[3]?.topics[2]
      if (tokenId) {  
        setMintingTokenId(parseInt(tokenId, 16).toString())
        handleMintingPreviewOpen()
        setBurnList([]);
      }
      setModalOpen(false);
    }
  })
 // width={windowSize.width*0.5}
 // aspectRatio={1}
 // live
///>
 // const height = width / aspectRatio
  return (
    <>
      <>
  <Box>
  {!isApproved && (
        <Button
          variant="contained"
          color="primary"
          
          sx={{ textTransform: "none" }}
          style={{ fontSize: "1.0rem" }}
        >
          APPROVE
        </Button>
      )}
   {isApproved && (
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



<Box margin={0.5} marginTop={3.5}>

      {!isPaused && isApproved && mintpasses && (
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
      
      {isPaused &&(
      <Button
        variant="contained"
        color="primary"
          
      
        sx={{ textTransform: "none" }}
        style={{ fontSize: "1.25rem" }}
      >
        MINT SOON!
      </Button>)}
  </Box>
  </ButtonGroup>)}
  </Box>
</>

     
      {
        isActive && !isConnected &&
        (
          <Typography fontWeight={800} fontStyle="italic">
            Connect to purchase...
          </Typography>
        )
      }
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
      <Box marginTop={1}>
        <Typography fontStyle="italic">
          {dialog}
        </Typography>
      </Box>
      <Modal
        open={mintingPreview}
        onClose={handleMintingPreviewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          bgcolor: "transparent",
          border: "none",
          boxShadow: 0,
          padding: 5
        }}>
          
          <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography id="modal-modal-title" variant="h1" fontSize="28px"  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      The Greatest: Muhammad Ali x Zeblocks
    </Typography>
    <Box marginTop={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <TokenView
                tokenId={mintingTokenId}
                width={windowSize.width*0.5}
                aspectRatio={1}
                live
              />
               
    </Box>
  </Box>
        </Box>
      </Modal>
    </>
  )
}

export default BurnButton