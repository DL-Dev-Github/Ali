import { Box, Button } from '@mui/material';
interface AllowlistButtonProps {
    displaySetting: string;
  }
  
  const AllowlistButtonSmall = ({ displaySetting }: AllowlistButtonProps) => {
  return (
    
      <Button
      
        variant="contained"
        color="primary"
        size="large"
        href="/allowlist"
        style={{borderRadius: '8px', height: "50px", width: "240px", color: "white" }}
      >
        <span style={{ fontSize: "18px" }}>CONNECT</span>
      </Button>
   
  );
};

export default AllowlistButtonSmall;
