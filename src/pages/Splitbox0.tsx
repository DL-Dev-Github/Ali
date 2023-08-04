import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Page from 'components/Page';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { scroller } from 'react-scroll';
import { config } from 'react-spring';
import { Button } from '@mui/material'; // Add this impor
import LoadingScreen from 'components/LoadingScreen'; // Add this import

type ContentData = {
  title: string;
  title2?: string;
  image: string;
  text: string;
  text2?: string;
  textAlign?: 'left' | 'center' | 'right';
  customStyle?: React.CSSProperties;
  buttonText: string; // Add this property
  imagePosition?: 'overlay' | 'nextTo'; // Add this property
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Add this property
};

const contentData: ContentData[] = [
  {
    title: 'MUHAMMAD ALI',
    title2: 'THE GREATEST',
    image: './media/section1.jpg',
    text: 'A GENERATIVE ART PROJECT',
    text2: 'BY ZEBLOCKS',
    textAlign: 'left',
   
    buttonText: 'CHECK ALLOWLIST STATUS',
    imagePosition: 'nextTo',
    headingType: 'h1',
    },
    {
    title: 'Noble Citizens and Daring Hunters',
    image: './media/bg/bg2.png',
    text: 'Assume the role of a noble citizen, reveling in the vibrant metropolis, or a daring hunter, venturing into the wilderness to gather precious resources and battle elemental creatures.',
    textAlign: 'left',
    customStyle: {
    justifyContent: 'left',
    },
    buttonText: 'Choose Your Path',
    imagePosition: 'overlay',
    },
    {
    title: 'A Living, Breathing World',
    image: './media/bg/bg3.png',
    text: 'Explore the breathtaking metaverse of Sage Towers, renowned for its majestic architecture and flourishing arts and entertainment scene.',
    textAlign: 'right',
    customStyle: {
    justifyContent: 'flex-end',
    },
    buttonText: 'Discover the City',
    imagePosition: 'overlay',
    },
    {
    title: 'Unleash the Power of AI',
    image: './media/bg/bg4.png',
    text: 'Experience a vivid, ever-evolving gaming world with our "Living NPCs," powered by advanced AI algorithms that give them unique personalities, behavior patterns, and the ability to adapt.',
    textAlign: 'left',
    customStyle: {
    justifyContent: 'flex-start',
    },
    buttonText: 'Meet the NPCs',
    imagePosition: 'overlay',
    },
];

let content = contentData[0];
const SplitBox0:  React.FC  = () => {
  return (
     
    <Box  
      bgcolor="#000000"
      sx={{
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: content.imagePosition === 'nextTo' ? 'row' : 'column',
        alignItems: 'center',
        textAlign: content.textAlign || 'inherit',
        gap: 2,
        maxWidth: '100%',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
       
      <Box   sx={{
        justifyContent: 'flex-end'}}>
        <Typography variant={content.headingType}>{content.title}</Typography>
        <Typography variant="body1">{content.text}</Typography>
        <Box marginTop={"10rem"} marginBottom={"1rem"}>
        <Button
        
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: 'none',
        
           
           
          }}
          href="/allowlist"
        >
          {content.buttonText}
        </Button>
        </Box>
      </Box>
      {content.imagePosition === 'nextTo' && (
        <img
          src={content.image}
          alt={content.title}
          style={{
            maxWidth: '50%',
            objectFit: 'contain',
            maxHeight: '75%',
          }}
        />
      )}
    </Box>
  );
};

export default SplitBox0;
