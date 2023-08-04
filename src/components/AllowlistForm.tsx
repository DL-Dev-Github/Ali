import { useEffect, useState } from 'react';
import { Button, Grid, makeStyles, TextField, Theme, Typography, Box,Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAccount } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TwitterIcon from '@mui/icons-material/Twitter';
import axios, { AxiosError } from 'axios';
import VideoBackground from 'utils/VideoBackground';
import TwitterLoginButton from './TwitterLoginButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import theme from 'theme';
//import { motion, AnimatePresence } from 'framer-motion';
import {  BoxProps } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';
import { CustomConnectButton2 } from './CustomConnectButton2';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css'; // Assuming your CSS file is named 'App.css'
import { useTransition, animated } from 'react-spring';
import NewForm from './NewForm';
import Confetti from 'react-confetti';


function AllowlistForm() {
const [phase, setPhase] = useState(1);
const [email, setEmails] = useState('');
const [answer, setAnswer] = useState('');
const [answer2, setAnswer2] = useState('');
const [answer3, setAnswer3] = useState('');
const [answer4, setAnswer4] = useState('');
const [answer5, setAnswer5] = useState('');
const [twitterHandle, setTwitterHandle] = useState('');
const [tweet, setTweet] = useState('');
const { address, isConnected } = useAccount();
const [isConnectedAndReady, setIsConnectedAndReady] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);
useEffect(() => {
if (isConnected && phase < 2) {
setIsConnectedAndReady(true);
setPhase(2);
}
else if (!isConnected) {
  setIsConnectedAndReady(false);
  setPhase(1);
}
}, [isConnected, phase]);

const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setAnswer(event.target.value);
};

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setEmails(event.target.value);
};

const handleTweetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setTweet(event.target.value);
};

const handleAnswer2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAnswer2(event.target.value);
};

const handleAnswer3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAnswer3(event.target.value);
};

const handleAnswer4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAnswer4(event.target.value);
};

const handleAnswer5Change = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAnswer5(event.target.value);
};

const handleTwitterHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setTwitterHandle(event.target.value);
};


const handleNextPhase = () => {
setPhase(phase + 1);
};

const handlePreviousPhase = () => {
setPhase(phase - 1);
};

const handleSubmit = async () => {
  console.log("submitting");
  try {
    const response = await axios.post('https://api.muhammadalinft.io/submit', {
      email,
      ethAddress: address,
      userInput: answer,
      userInput2: answer2,
      userInput3: answer3,
      twitter: twitterHandle,
    });

    if (response.status === 201) {
      //setShowConfetti(true);
     
        slowEffect();
        setTimeout(() => {
          setPhase(8);
          
        }, 500);
      
     
    }
  } catch (error) {
      <Alert severity="error">You already submitted</Alert>
      console.error('You already submitted');
  }
};

const slowEffect = async () => {
 
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        
      }, 6000);
  
};



useEffect(() => {
  const fetchSubmissionState = async () => {
    try {
      const response = await axios.get(`https://api.muhammadalinft.io/submission-state/${address}`);
      const submissionState = response.data.state;
      if (submissionState === 'pending') {
        setPhase(11);
      } else if (submissionState === 'approved') {
        setPhase(10);
      }
      else if (submissionState === 'denied') {
        setPhase(11);
      }
    } catch (error) {
      //setPhase(0);
    }
  };

  if (isConnectedAndReady) {
    fetchSubmissionState();
  }
}, [isConnectedAndReady, address]);


return (
  <div>
  {showConfetti &&        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, width: '100%', height: '100%' }}>
          <Confetti />
        </div>}
        <NewForm
      phase={phase}
      answer={answer}
      answer2={answer2}
      answer3={answer3}
      answer4={answer4}
      answer5={answer5}
      email={email}
      twitterHandle={twitterHandle}
      tweet={tweet}
      handleAnswerChange={handleAnswerChange}
      handleAnswer2Change={handleAnswer2Change}
      handleAnswer3Change={handleAnswer3Change}
      handleAnswer4Change={handleAnswer4Change}
      handleAnswer5Change={handleAnswer5Change}
      handleEmailChange={handleEmailChange}
      handleTwitterHandleChange={handleTwitterHandleChange}
      handleTweetChange={handleTweetChange}
      handleNextPhase={handleNextPhase}
      handlePreviousPhase={handlePreviousPhase}
      handleSubmit={handleSubmit}
    />
    <Footer/>
  </div>
  );
  }
  
  export default AllowlistForm;