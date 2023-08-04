
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HeaderImage from 'components/HeaderImage';
import AboutSection from 'components/AboutSection';
import AllowlistButton from 'components/AllowlistButton';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useEffect, useState } from 'react';
import GreatestMint from 'components/GreatestMint';
import MintingInterfacePass from 'components/MintingInterfacePass';
import MintingInterface from 'components/MintingInterface';
import zIndex from '@mui/material/styles/zIndex';





const LandingGood = () => {

  const [isSwapped, setIsSwapped] = useState(false);

  const handleHover = (hovering : boolean) => {
    setIsSwapped(!isSwapped);
  };


  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const swapThreshold = 80; // You can set this value based on when you want the text to swap

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
      <Grid  container sx={{ height: '100vh', backgroundColor: "#000000", zIndex: "-1" }}>
        <Grid color="#000000"  item xs={6} container direction="column" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor: "#000000", pl: 4, pr: 4 }}>
         <Box sx={{ position: 'absolute', top: '18%', zIndex: "1" }}>
         <Box onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onTouchStart={() => handleHover(true)} onTouchEnd={() => handleHover(false)}>
        
       
          <Typography variant="h1" className="text-white"  sx={{ pt: 2 }}>MUHAMMAD ALI</Typography>
          <Typography variant="h1" marginTop={'-3.5vh'} color={'transparent'} className='transparent-text-white-outline' sx={{ color:"transparent", pb: 2 }}>THE GREATEST</Typography>
     
          </Box>
          </Box>
          <Box sx={{ position: 'absolute', bottom: '38%'}}>
          <Typography variant="h2" sx={{ pt: 2, pb: -2 }}>MINT PASSES FOR</Typography>
          <Typography variant="h2" sx={{ pt: -2, pb: 2 }}>A GENERATIVE ART NFT PROJECT BY ZEBLOCKS</Typography>
         
          </Box>
          <Box sx={{ position: 'absolute', bottom: '5%'}}>
          <MintingInterfacePass 
         
         /> </Box>
        </Grid>
        <Grid item xs={6} container>

          <Box
          marginTop={'6vh'}
            sx={{position: 'absolute', top: '0%',
              width: '50%',
              height: '95%',
              backgroundImage: 'url(/media/section1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: "#000000",
              zIndex: "0",
            }}
          />
        </Grid>
      </Grid>   
      </Hidden>
      <Hidden mdUp>
      <Grid container sx={{ backgroundColor: "#000000" }} direction="column" justifyContent="center" alignItems="center" >
      <Grid item xs={10} container justifyContent="center" alignItems="center">
            <Box
               
              sx={{
                
                width: '100%',
                height: '6.5vh',
           
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "#000000",
              }}
            />
          </Grid>
          <Grid item xs={10} container justifyContent="center" alignItems="center">
            <Box
              
              sx={{
                
                width: '100%',
                height: '42vh',
                backgroundImage: 'url(/media/section1mobile.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "#000000",
              }}
            />
          </Grid>
          <Grid color="#000000" item xs={12} container direction="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#000000", pl: 2, pr: 2, py: 1 }}>
          <Box onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onTouchStart={() => handleHover(true)} onTouchEnd={() => handleHover(false)}>
        
          
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1, pb: 1}}>
            <MintingInterfacePass/>
            </Box>
             <Typography variant="h1" className='text-white'  sx={{ fontSize: "3.85rem",  pt: 1, textAlign: 'center' }}>
              MUHAMMAD ALI</Typography>
             <Typography variant="h1" className="transparent-text-white-outline" color={'transparent'} marginTop={'-0.5vh'} sx={{ color : 'transparent', fontSize: "3.85rem", pb: 2, textAlign: 'center' }}>
              THE GREATEST</Typography>        
       
           </Box>
           <Typography variant="h2" sx={{ pt: 1, pb: -2 , fontSize:"1rem", textAlign: 'center' }}>MINT PASSES FOR</Typography>
           <Typography variant="h2" sx={{ pt: -2, pb: 2, fontSize:"1rem",  textAlign: 'center'  }}>A GENERATIVE ART NFT PROJECT BY ZEBLOCKS</Typography>
       
          </Grid>
        </Grid>
        </Hidden>
    </Box>
     
  );
};

export default LandingGood;