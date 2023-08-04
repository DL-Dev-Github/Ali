
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HeaderImage from 'components/HeaderImage';
import AboutSection from 'components/AboutSection';
import AllowlistButton from 'components/AllowlistButton';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useEffect, useState } from 'react';
import Footer from 'components/Footer';





const LandingBot = () => {

  const [isSwapped, setIsSwapped] = useState(false);

  const handleHover = (hovering : boolean) => {
    setIsSwapped(hovering);
  };


  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const swapThreshold = 120; // You can set this value based on when you want the text to swap

    if (scrollPosition > swapThreshold) {
      setIsSwapped(true);
    } else {
      setIsSwapped(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);


  return (
    <Box sx={{ width: "100%"}}>
      <Hidden smDown>
      <Grid  container sx={{ height: '100vh', backgroundColor: "#000000" }}>
      
        <Grid  color="#000000"  item xs={6} container direction="column" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#000000", pl: 10, pr: 10, }}>
        <Box height={'80vh'}  display="flex" flexDirection="column" justifyContent="center" alignItems="left">
  <Typography variant="h5" style={{ textAlign: 'left' }}>ABOUT ZEBLOCKS</Typography>
  <Box marginTop={4} maxWidth = {"60vh"}>
    <Typography variant="body1" style={{ textAlign: 'left' }}>Zeblocks is a collaboration between Guillaume, an artist and digital designer, and Sebastian, a talented developer. They are passionate about the blockchain and are innovators in the generative art space.</Typography>
  </Box>
  <Box marginTop={4} maxWidth = {"60vh"}>
    <Typography variant="body1" style={{ textAlign: 'left' }}>Their past projects include Unigrids, an Art Blocks curated project that pushed the boundaries of on-chain art, animation and audio; and Beatboxes, the first fully immersive, virtual reality, audiovisual generative art on the Ethereum blockchain. They are also the artists behind Modern Muse, Marilyn Monroe’s generative NFT project.</Typography>
  </Box>
  <Box marginTop={6}>
  <Typography variant="h5" style={{ fontSize: "16px", textAlign: 'left' }}>LEARN MORE</Typography>
  <a href="https://zeblocks.com/" target="_blank">
    <img src={'/media/icon_WEB_gold.svg'} width={"42px"} height={"42px"} />
  </a>
  <a href="https://twitter.com/Ze_blocks" target="_blank">
    <img src={'/media/icon_TW_gold.svg'} width={"42px"} height={"42px"} />
  </a>
         
            </Box>
</Box>
        </Grid>    
        <Grid item xs={6} container>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/media/section4.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: "#000000"
            }}
          />
        </Grid>  
      </Grid>   
      </Hidden>
      <Hidden mdUp>
      <Grid marginTop={"30vh"} container sx={{ backgroundColor: "#000000" }} direction="column" justifyContent="center" alignItems="center" >
         
          <Grid color="#000000" item xs={12} container direction="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#000000", pl: 3.5, pr: 3.5, py: 4 }}>
          <Box marginTop={1} marginBottom= {4}>
        <Typography variant="h5" style={{fontSize: "1rem", textAlign: 'center' }}>ABOUT ZEBLOCKS</Typography>
 <Box marginTop={3}>
        <Typography variant="body1" sx={{ backgroundColor: "#000000", pl: 2, pr: 2, }} style={{ fontSize: "0.85rem", textAlign: 'center' }}>Zeblocks is a collaboration between Guillaume, an artist and digital designer, and Sebastian, a talented developer. They are passionate about the blockchain and are innovators in the generative art space.</Typography>
        </Box>
        
        <Box marginTop={3} >
        <Typography variant="body1" sx={{ backgroundColor: "#000000", pl: 2, pr: 2, }} style={{ fontSize: "0.85rem", textAlign: 'center' }}>Their past projects include Unigrids, an Art Blocks curated project that pushed the boundaries of on-chain art, animation and audio; and Beatboxes, the first fully immersive, virtual reality, audiovisual generative art on the Ethereum blockchain. They are also the artists behind Modern Muse, Marilyn Monroe’s generative NFT project.</Typography>
        </Box>
        <Box marginTop={5}>
          <Typography variant="h5" style={{ fontSize: "16px", textAlign: 'center' }}>LEARN MORE</Typography>  
        <Box display="flex" justifyContent="center">

  <a href="https://zeblocks.com/" target="_blank">
    <img src={'/media/icon_WEB_gold.svg'} width={"42px"} height={"42px"} />
  </a>
  <a href="https://twitter.com/Ze_blocks" target="_blank">
    <img src={'/media/icon_TW_gold.svg'} width={"42px"} height={"42px"} />
  </a>
</Box>

            </Box>
        </Box>
          </Grid>
          <Grid item xs={10} container justifyContent="center" alignItems="center">
            <Box
              sx={{
                
                width: '100%',
                height: '40vh',
                backgroundImage: 'url(/media/section4mobile.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "#000000",
              }}
            />
          </Grid>
        </Grid>
        </Hidden>
     
    </Box>
     
  );
};
export default LandingBot;