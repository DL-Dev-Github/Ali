
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HeaderImage from 'components/HeaderImage';
import AboutSection from 'components/AboutSection';
import AllowlistButton from 'components/AllowlistButton';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useEffect, useState } from 'react';





const LandingThree = () => {

  const [isSwapped, setIsSwapped] = useState(true);

  const handleHover = (hovering : boolean) => {
   setIsSwapped(!isSwapped);
  };

  const [swapCount, setSwapCount] = useState(0);

  const handleScroll = () => {
    //const scrollPosition = window.scrollY;
    const swapThreshold = 50; // You can set this value based on when you want the text to swap
    if(swapCount > swapThreshold){
      setIsSwapped(!isSwapped);
      setSwapCount(0);
    }
    setSwapCount((swapCount) => swapCount + 1);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [swapCount]);

  return (
    <Box  width={'100vw'}  sx={{width: "100%" }}>
      
      <Box  width={'100vw'} height = {"4"}  sx={{
     
    backgroundImage:
    
    'linear-gradient(0.15turn,#d0112b,  #b1841d)',
    paddingTop: 1,
  }}>
        <Hidden smDown>
         <Box  width={'100vw'}  sx={{ height: '45vh', backgroundColor: "#000000" }}>
         <Box onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onTouchStart={() => handleHover(true)} onTouchEnd={() => handleHover(false)}>
        
       
          <Box sx={{ alignContent:"center", textAlign:"center" } }>
            <Box  paddingTop={'7vh'}>
            <Typography variant="h1" sx={{ color : 'transparent', pt: 2, textAlign: 'center', display: 'inline' }} className="transparent-text-white-outline">
              "I AM{' '}
            </Typography>
            <Typography variant="h1" sx={{ textAlign: 'center', display: 'inline' }} className="text-white">
              THE GREATEST
            </Typography>
            <Typography variant="h1" sx={{ color : 'transparent',textAlign: 'center', display: 'inline' }} className="transparent-text-white-outline">
              , I SAID THAT
            </Typography>
            
            <Typography variant="h1" marginTop={'-3.5vh'} sx={{ color : 'transparent',pb: 2, textAlign: 'center' }} className="transparent-text-white-outline">
              EVEN BEFORE I KNEW I WAS"
            </Typography>
            </Box>
            </Box>
        
        
        </Box>
       
        
          </Box>
          <Box
        width={'100vw'} 
        height={'100vh'}
            sx={{
            
              backgroundImage: 'url(/media/section3.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            
            }}
          />
      </Hidden>
      <Hidden mdUp>
      <Box width={'100vw'}   sx={{ height: '44vh', backgroundColor: "#000000" }}>
      <Box onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onTouchStart={() => handleHover(true)} onTouchEnd={() => handleHover(false)}>
        
        
   
         <Box sx={{ alignContent:"center", textAlign:"center" } }>
         <Box  paddingTop={'7vh'} paddingBottom={"7vh"}>
           <Typography variant="h1" sx={{ fontSize:"3rem", color : 'transparent',  textAlign: 'center', display: 'inline' }} className="transparent-text-white-outline">
             "I AM{' '}
           </Typography>
           <Typography variant="h1" sx={{fontSize:"3rem", textAlign: 'center', display: 'inline' }} className="text-white">
             THE GREATEST,
           </Typography>
        
          
           <Typography variant="h1"  sx={{ fontSize:"3rem",color : 'transparent', textAlign: 'center' }} className="transparent-text-white-outline">
           I SAID THAT EVEN BEFORE I KNEW I WAS"
           </Typography>
            </Box>
           </Box>
    
       </Box>
      <Grid container sx={{ backgroundColor: "#000000" }} direction="column" justifyContent="center" alignItems="center" >
      <Grid item xs={10} container justifyContent="center" alignItems="center">
            <Box
              sx={{
                
                width: '100vw',
                height: '44vh',
                backgroundImage: 'url(/media/section3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "#000000",
              }}
            />
          </Grid>
          
        </Grid>
        </Box>
        </Hidden>
       
    </Box>
     </Box>
  );
};

export default LandingThree;