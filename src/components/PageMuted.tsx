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
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}
const kek = " : CONNECT";
const PageMuted = ({ children }: Props) => {
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
        
        <Box  sx={{
    backgroundImage:
   
    'linear-gradient(0.15turn,#d0112b,  #b1841d)',
    padding: 0.5,
  }}>
      
      
        </Box>
       
        </div>
       
   
        <Box sx={{ backgroundColor: "#000000" }}  style={{ zIndex: 1 }}>{children}</Box>
       
      
      
    </Box>
  );
};

export default PageMuted;
