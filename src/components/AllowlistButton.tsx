import { Box, Button } from '@mui/material';
interface AllowlistButtonProps {
    displaySetting: string;
  }
  
  const AllowlistButton = ({ displaySetting }: AllowlistButtonProps) => {
  return (
    
      <Button
      
        variant="contained"
        color="primary"
        size="large"
        href="/allowlist"
        style={{borderRadius: '10px', height: "60px", width: "330px", color: "white" }}
      >
        <span style={{ fontSize: "28px" }}>CONNECT</span>
      </Button>
   
  );
};

export default AllowlistButton;
