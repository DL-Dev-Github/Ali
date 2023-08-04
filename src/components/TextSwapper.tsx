import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const TextSwapper = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  const swapText = () => {
    setIsSwapped((prev) => !prev);
  };

  useEffect(() => {
    const intervalId = setInterval(swapText, 2500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {isSwapped ? (
        <>
         <Box  marginBottom="-6rem" marginTop={ "2vh"}>
        
          <h1 className="transparent-text-white-outline">MUHAMMAD ALI</h1>
          </Box>
          <h1 className="text-white">THE GREATEST</h1>
          </>
      ) : (
        <>
         <Box  marginBottom="-6rem" marginTop={ "2vh"}>
          <h1 className="text-white">MUHAMMAD ALI</h1>
          </Box>
          <h1 className="transparent-text-white-outline">THE GREATEST</h1>
        </>
      )}
    </div>
  );
};

export default TextSwapper;
