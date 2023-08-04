import {
  Button,
  Typography
} from "@mui/material"

interface Props {
  phase1Enabled: boolean | undefined,
  phase2Enabled: boolean | undefined,
  openMintingEnabled: boolean | undefined,
  message: string,
  contractPurchase: any
}

const MintingButtonEnabledPass = ({ phase1Enabled,
  phase2Enabled,
  openMintingEnabled,
  message,
  contractPurchase,}: Props) => {  

    const getPhaseText = () => {
      if (phase1Enabled) return 'Phase 1';
      if (phase2Enabled) return 'Phase 2';
      if (openMintingEnabled) return 'Open Minting';
      return 'Live Mint Soon!';
    };
  
    const phaseText = getPhaseText();
  // disabled={!contractPurchase} 
  return (
    <Button
    variant="contained"
    color="primary"
  
    onClick={() => contractPurchase?.()}
    sx={{ 
      minWidth: "310px",
      paddingTop: 2.5,
      paddingRight: 2,
      paddingLeft: 2,
      paddingBottom: 2.5,
      boxShadow: "none",
      textTransform: "none" 
    }}>
      <Typography fontSize={24} fontWeight={800}>
       {phaseText}
      </Typography>
    </Button>
  )
}

export default MintingButtonEnabledPass