import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Link
} from '@mui/material';
//import { Link, Link as RouterLink } from 'react-router-dom';
import Marquee from 'react-marquee-slider';

import Header from './Header';
import VideoBackground from '../utils/VideoBackground';

interface Props {
  children: React.ReactNode;
}
const kek = " : APPLY TO ALLOWLIST";
const Page = ({ children }: Props) => {
  const marqueeItems = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
     
      <Typography variant="h3">{kek}</Typography>
   
    </Box>
  );

  return (
    <Box>
  <div style={{ position: 'fixed', zIndex: 100, top: 0, left: 0, width: '100%' }}>
        <Header />
        <Link href="/allowlist" underline="hover" sx={{color: "#666"}}>
        <Box  sx={{
    backgroundImage:
   
    'linear-gradient(0.05turn,#111111,#d0112b,  #b1841d, #111111)',
    padding: 0.5,
  }}>
      
        <Marquee
          velocity={5}
          direction="rtl"
          scatterRandomly={false}
          resetAfterTries={10}
          onInit={() => {}}
          onFinish={() => {}}
        >
          {Array.from({ length: 30 }, (_, id) => (
            <Box  key={`marquee-item-${id}`} sx={{ paddingLeft: 1 , justifyContent: 'space-between'}}>
              {marqueeItems}
            </Box>
          ))}
        </Marquee>
      
        </Box>
        </Link>
        </div>
       
   
        <Box color="#000000"  style={{ zIndex: 1 }} >{children}</Box>
       
      
         
          
   
    </Box>
  );
};

export default Page;
