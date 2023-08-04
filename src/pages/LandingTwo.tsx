
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HeaderImage from 'components/HeaderImage';
import AboutSection from 'components/AboutSection';
import AllowlistButton from 'components/AllowlistButton';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useEffect, useState } from 'react';





const LandingTwo = () => {

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
      <Grid item xs={6} container>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/media/section2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: "#000000"
            }}
          />
        </Grid>
        <Grid  color="#000000"  item xs={6} container direction="column" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#000000", pl: 10, pr: 10, }}>
        <Typography variant="h5" style={{ textAlign: 'left' }}>THE GREATEST: MUHAMMAD ALI x ZEBLOCKS</Typography>
        <Box marginTop={6}>
        <Typography variant="body1" style={{ textAlign: 'left' }}>Muhammad Ali, a larger-than-life figure in the world of boxing, is known for his unparalleled talent in the ring, his charismatic personality, and his unwavering commitment to social justice. Ali’s impact on sports and society continues to be felt today, making him an enduring icon and an inspiration to people around the world.</Typography>
        </Box>
        <Box marginTop={4}>
        <Typography variant="body1" style={{ textAlign: 'left' }}>In the NFT series “The Greatest”, the renowned artist duo Zeblocks pays tribute to Muhammad Ali by reimagining him through the Web3-native medium of generative art. Every NFT will be uniquely created at time of mint by Zeblocks' on-chain algorithm, pushing the boundaries of art and innovation in the spirit of Ali.</Typography>
        </Box>
       <Box marginTop={4}>
        <Typography variant="body1" style={{  textAlign: 'left',  fontWeight: 'bold'}}> This mint pass will guarantee you one mint for The Greatest: Muhammad Ali x Zeblocks generative art drop.</Typography>
        </Box>
        </Grid>      
      </Grid>   
      </Hidden>
      <Hidden mdUp>
      <Grid container sx={{ backgroundColor: "#000000" }} direction="column" justifyContent="center" alignItems="center" >
          <Grid item xs={10} container justifyContent="center" alignItems="center">
            <Box
              sx={{
                
                width: '100%',
                height: '40vh',
                backgroundImage: 'url(/media/section2mobile.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "#000000",
              }}
            />
          </Grid>
          <Grid color="#000000" item xs={12} container direction="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#000000", pl: 3, pr: 3, py: 4 }}>
          <Box marginTop={5} marginBottom= {8}>
          <Typography variant="h5"  style={{ fontSize: "1rem", textAlign: 'center' }}>THE GREATEST: MUHAMMAD ALI x ZEBLOCKS</Typography>
        <Box marginTop={3} sx={{  pl: 1.5, pr: 1.5, }} >
        <Typography variant="body1" style={{ fontSize: "0.85rem", textAlign: 'center' }}>Muhammad Ali, a larger-than-life figure in the world of boxing, is known for his unparalleled talent in the ring, his charismatic personality, and his unwavering commitment to social justice. Ali’s impact on sports and society continues to be felt today, making him an enduring icon and an inspiration to people around the world.</Typography>
        </Box>
        <Box marginTop={3} sx={{  pl: 1.5, pr: 1.5, }}  >
        <Typography variant="body1" style={{ fontSize: "0.85rem", textAlign: 'center' }}>In the NFT series “The Greatest”, the renowned artist duo Zeblocks pays tribute to Muhammad Ali by reimagining him through the Web3-native medium of generative art. Every NFT will be uniquely created at time of mint by Zeblocks' on-chain algorithm, pushing the boundaries of art and innovation in the spirit of Ali.</Typography>
        </Box>
        <Box marginTop={4}>
        <Typography variant="body1" style={{ fontSize: "0.85rem",   textAlign: 'center',  fontWeight: 'bold'}}> This mint pass will guarantee you one mint for The Greatest: Muhammad Ali x Zeblocks generative art drop.</Typography>
        </Box>
        </Box>
          </Grid>
        </Grid>
        </Hidden>
    </Box>
     
  );
};
export default LandingTwo;