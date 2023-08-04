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

type FormProps = {
  phase: number;
  answer: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  email: string;
  twitterHandle: string;
  tweet: string;
  handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // What do you find most interesting about the project? Number 3
  handleAnswer2Change: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Have you collected any on chain art in the past? Number 4 
  handleAnswer3Change: (event: React.ChangeEvent<HTMLInputElement>) => void; // What are the most prominent NFTs that you own and love collecting? Number 5
  handleAnswer4Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnswer5Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTwitterHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Number 2
  handleTweetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextPhase: () => void;
  handlePreviousPhase: () => void;
  handleSubmit: () => void;
};


function NewForm(props: FormProps) {
  const {phase,
    answer,
    answer2,
    answer3,
    answer4,
    answer5,
    email,
    twitterHandle,
    tweet,
    handleAnswerChange,
    handleAnswer2Change,
    handleAnswer3Change,
    handleAnswer4Change,
    handleAnswer5Change,
    handleEmailChange,
    handleTwitterHandleChange,
    handleTweetChange,
    handleNextPhase,
    handlePreviousPhase,
    handleSubmit,} = props;

  const [showTweetButton, setShowTweetButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [followButtonDisabled, setFollowButtonDisabled] = useState(false);
  const [tweetButtonDisabled, setTweetButtonDisabled] = useState(false);

    
  const TwitterButtonstyles = {
    button: {
        borderRadius: '10px',
      background: '#d0112b',
      color: '#ffffff',
      width: '215px',
      height: '4.6vh',
      fontSize: '1.75vh', 
    },
    icon: {
      fontSize: '2.5vh',
      color: 'white',
      marginRight: '5px',
    },
  };
  const TwitterButtonDisabledstyles = {
    button: {
      borderRadius: '10px',
      background: '#400003',
      color: '#888888',
      width: '215px',
      height: '4.6vh',
      fontSize: '1.75vh', 
    },
    icon: {
      fontSize: '2.5vh',
      color: 'grey',
      marginRight: '5px',
    },
  };

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '-100%' },
  };
  const [followButtonIconStyle, setFollowButtonIconStyle] = useState(TwitterButtonstyles.icon);
const [tweetButtonIconStyle, setTweetButtonIconStyle] = useState(TwitterButtonstyles.icon);

  interface AnimatedBoxProps extends BoxProps {
    phase: number;
  }
  /*
  const AnimatedBox: React.FC<AnimatedBoxProps> = ({ phase, ...props }) => (
    <motion.div
    key={phase}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Box {...props} />
    </motion.div>
  );
*/
 // const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

 // const handleEmailChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  //  setEmail(event.target.value);
   // setEmails(event.target.value);
 // };

  const handleEmailBlur = () => {
    // Basic email validation using regex
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    setIsValid(isValidEmail);
  };
  const [previousPhase, setPreviousPhase] = useState(phase);

  useEffect(() => {
    if (phase !== previousPhase) {
      setPreviousPhase(phase);
    }
  }, [phase]);
  //https://twitter.com/intent/follow?screen_name=MuhammadAliNFT
  //https://twitter.com/intent/tweet?text=%F0%9F%A5%8A%F0%9F%8E%A8%20Come%20join%20the%20allowlist%20for%20the%20Muhammad%20Ali%20NFT%20series%20by%20%40MuhammadAliNFT%20and%20%40Ze_blocks%21%20This%20unique%20series%20pays%20tribute%20to%20the%20boxing%20legend%20through%20generative%20art%2C%20pushing%20the%20boundaries%20of%20innovation%20and%20creativity.%20Apply%20now%20https%3A%2F%2Fmuhmmadalinft.io%20%23MuhammadAliNFT
    const handleTwitterClick = async () => {
      console.log('clicked');
      try {
        const response = await axios.get('https://twitter.com/MuhammadAliNFT');
        window.location.href = response.data.redirectUrl;
      } catch (error) {
        console.error(error);
      }
    };

    const [consentChecked, setConsentChecked] = useState(false);

    const handleConsentChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
      setConsentChecked(event.target.checked);
    };
  
    
     
  const handleFollowClick = () => {
    setFollowButtonDisabled(true);
    setTimeout(() => {
      setShowTweetButton(true);
      setFollowButtonDisabled(false);
      setFollowButtonText('COMPLETE'); // Add this line to change the button te
      setFollowButtonStyle(TwitterButtonDisabledstyles.button);
      setFollowButtonIconStyle(TwitterButtonDisabledstyles.icon);
    }, 10000); // 10 seconds
    window.open("https://twitter.com/intent/follow?screen_name=MuhammadAliNFT", "_blank");
  };

  const handleTweetClick = () => {
    setTweetButtonDisabled(true);
    setTimeout(() => {
      setShowSubmitButton(true);
      setTweetButtonDisabled(false);
      setTweetButtonText('COMPLETE'); // Add this line to change the button te
      setTweetButtonStyle(TwitterButtonDisabledstyles.button);
      setTweetButtonIconStyle(TwitterButtonDisabledstyles.icon);
    }, 10000); // 10 seconds
    window.open("https://twitter.com/intent/tweet?text=Just%20applied%20for%20the%20%40MuhammadAliNFT%20allowlist!%0A%0AOn-chain%20generative%20art%20by%20%40Ze_blocks", "_blank");
  };
  const [tweetButtonText, setTweetButtonText] = useState('SEND TWEET');
  const [tweetButtonStyle, setTweetButtonStyle] = useState(TwitterButtonstyles.button);

  const [followButtonText, setFollowButtonText] = useState('FOLLOW US');
  const [followButtonStyle, setFollowButtonStyle] = useState(TwitterButtonstyles.button);

  const [minHeight, setMinHeight] = useState('72vh');
//https://twitter.com/intent/tweet?text=Just%20applied%20for%20the%20%40MuhammadAliNFT%20allowlist!%0A%0AOn-chain%20generative%20art%20by%20%40Ze_blocks
//   window.open("https://twitter.com/intent/tweet?text=%F0%9F%A5%8A%F0%9F%8E%A8%20Come%20join%20the%20allowlist%20for%20the%20Muhammad%20Ali%20NFT%20series%20by%20%40MuhammadAliNFT%20and%20%40Ze_blocks%21%20This%20unique%20series%20pays%20tribute%20to%20the%20boxing%20legend%20through%20generative%20art%2C%20pushing%20the%20boundaries%20of%20innovation%20and%20creativity.%20Apply%20now%20https%3A%2F%2Fmuhmmadalinft.io%20%23MuhammadAliNFT", "_blank");
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setMinHeight('68vh');
      } else {
        setMinHeight('85vh');
      }
    };

    // Initial resize
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
   return(
    
   <Box>
     
    <Box  sx={{ minHeight: minHeight , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     
       <LoadingScreen />
  {phase === 1 && (
  <>
  <CSSTransition classNames="fade" timeout={300}>
  <Box borderRadius={3} margin={"2vw"} padding={"3vw"} sx={{backgroundColor: '#242424',  minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
      APPLICATIONS CLOSED 
    </Typography>
    
   
  </Box>
   </CSSTransition>
</>

  )}
    {phase === 2 && (
    <>
        <CSSTransition classNames="fade" timeout={300}>
     <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{minWidth: '50vw', backgroundColor: '#242424', minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
     <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
      APPLICATIONS CLOSED 
    </Typography>
      </Box>
      </CSSTransition>
    </>
  )}
  {phase === 3 && (
    <>
        <CSSTransition classNames="fade" timeout={300}>
     <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{minWidth: '50vw', backgroundColor: '#242424', minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
     What do you find most interesting about this project?
    </Typography>
      <TextField label="Answer here" value={answer} color="secondary"  onChange={handleAnswerChange} fullWidth multiline rows={4} sx={{ Height: '10vh', color: 'white',
    "&& .MuiInputBase-input": {
      color: "white"
    },
    }}/>
    
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" onClick={handlePreviousPhase}  sx={{ marginTop: '3vh', marginRight: '1vh' }}>
                <ArrowBackIcon />
            </Button>
            <Button variant="contained" onClick={handleNextPhase} disabled={answer.length < 3} sx={{ marginTop: '3vh' } }>
                <ArrowForwardIcon />
            </Button>
        </Box>
      </Box>
      </CSSTransition>
    </>
  )}
   {phase === 4 && (
    <>
        <CSSTransition classNames="fade" timeout={300}>
     <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{minWidth: '50vw', backgroundColor: '#242424', minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
    Have you collected any on chain art in the past?
    </Typography>
      <TextField label="Answer here" value={answer2} color="secondary"  onChange={handleAnswer2Change} fullWidth multiline rows={4} sx={{ Height: '10vh', color: 'white',
    "&& .MuiInputBase-input": {
      color: "white"
    },
    }}/>
       <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" onClick={handlePreviousPhase}  sx={{ marginTop: '3vh', marginRight: '1vh' }}>
                <ArrowBackIcon />
            </Button>
            <Button variant="contained" onClick={handleNextPhase} disabled={answer2.length < 3} sx={{ marginTop: '3vh' } }>
                <ArrowForwardIcon />
            </Button>
        </Box>
      </Box>
      </CSSTransition>
    </>
  )}
   {phase === 5 && (
    <>
        <CSSTransition classNames="fade" timeout={300}>
     <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{minWidth: '50vw', backgroundColor: '#242424', minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
    What are the most prominent NFTs that you own and love collecting?
    </Typography>
      <TextField label="Answer here" value={answer3} color="secondary"  onChange={handleAnswer3Change} fullWidth multiline rows={4} sx={{ Height: '10vh', color: 'white',
    "&& .MuiInputBase-input": {
      color: "white"
    },
    }}/>
     <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" onClick={handlePreviousPhase}  sx={{ marginTop: '3vh', marginRight: '1vh' }}>
                <ArrowBackIcon />
            </Button>
            <Button variant="contained" onClick={handleNextPhase} disabled={answer3.length < 3} sx={{ marginTop: '3vh' } }>
                <ArrowForwardIcon />
            </Button>
        </Box>
      </Box>
      </CSSTransition>
    </>
  )}
  {phase === 6 && ( 
       <CSSTransition classNames="fade" timeout={300}>
        <Box borderRadius={3}  margin={'2vw'} padding={'3vw'} sx={{ minWidth: '50vw', backgroundColor: '#242424', minHeight: '15vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h2" align="center" color="white" sx={{ margin: '3vh' }}>
          What is your email address?
        </Typography>
      
        <TextField label="Email here" value={email} color="secondary"  onChange={handleEmailChange} onBlur={handleEmailBlur} fullWidth error={!isValid} helperText={!isValid ? 'Please enter a valid email address' : ''} sx={{ Height: '10vh', color: 'white', '&& .MuiInputBase-input': { color: 'white' } }} />
      
        <FormControlLabel
         control={
          <Checkbox
            checked={consentChecked}
            onChange={handleConsentChange}
            style ={{
              color: 'white',
            }}
          
          />
        }
          label={
            <Typography variant="body1" sx={{ color: 'white', fontSize: '1vh' }}>
              By submitting your email address, you consent to receiving email communications from us about the Muhammad Ali NFT series and related offers
            </Typography>
          }
          sx={{ color: 'gold' }}
        />
      
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          { !isValid && consentChecked && (
             <Button onClick={handleEmailBlur} style={TwitterButtonstyles.button} sx={{ marginTop: '2vh' }}>
             CHECK EMAIL
           </Button>
          )}
          {isValid && consentChecked && (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" onClick={handlePreviousPhase}  sx={{ marginTop: '3vh', marginRight: '1vh' }}>
                <ArrowBackIcon />
            </Button>
            <Button variant="contained" onClick={handleNextPhase} sx={{ marginTop: '3vh' }}>
                <ArrowForwardIcon />
            </Button>
        </Box>
          )}
        </Box>
      </Box>
      </CSSTransition>
  )}
  {phase === 7 && (
    <>
 
       <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{ minWidth: '50vw', backgroundColor: '#242424', minHeight: '15vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <Typography variant="h2" align="center" color="white" sx={{ margin: '3vh' }}>
        Share on Twitter to complete your application submission!
    </Typography>
    
    
        <Button
          style={followButtonStyle}
          startIcon={<TwitterIcon style={followButtonIconStyle} sx={{   fontSize: 36 }} />}
          onClick={handleFollowClick}
          disabled={followButtonDisabled}
          sx={{ marginTop: '2vh' }}
        >
          {followButtonDisabled ? 'VERIFYING...' : followButtonText}
        </Button>
      

      
        <Button
           style={tweetButtonStyle}
          startIcon={<TwitterIcon style={tweetButtonIconStyle} sx={{ fontSize: 36 }} />}
          onClick={handleTweetClick}
          disabled={tweetButtonDisabled}
          sx={{ marginTop: '2vh' }}
        >
          {tweetButtonDisabled ? 'VERIFYING...' : tweetButtonText}
        </Button>
      

      {showSubmitButton && (
        <Button onClick={handleSubmit} style={TwitterButtonstyles.button} sx={{ marginTop: '2vh' }}>
          SUBMIT
        </Button>
      )}
       {!showSubmitButton && (
        <Button onClick={handleSubmit} style={TwitterButtonDisabledstyles.button} sx={{ marginTop: '2vh' }}>
          SUBMIT
        </Button>
      )}
    
  
</Box>
    </>
  )}
  {phase === 8 && (
   <>

   <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{backgroundColor: '#242424',  minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
     <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
       Thank you for your application!
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '2vh' }}>
      We look forward to reviewing your application. In the meantime, follow @MuhammadAliNFT on Twitter for the latest drop details and updates.
     </Typography>
     
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '2vh' }}>
     Check back here for updates on your application status.
     </Typography>
     <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Button onClick={handleNextPhase} style={TwitterButtonstyles.button} sx={{ marginTop: '2vh' }}>
          CHECK STATUS
        </Button>
    </Box>
   </Box>
 </>
  )
  }
    {phase === 9 && (
      
   <>
   
   <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{backgroundColor: '#242424',  minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
     <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
       APPLICATION STATUS: PENDING
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
      We've received your application!
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
     Turn on notifications for @MuhammadAliNFT for the latest drop details and more allowlist opportunities. Check back here for updates on your application status.
     </Typography>
     <Button
          style={TwitterButtonstyles.button}
          
          onClick={handleFollowClick}
          disabled={followButtonDisabled}
        >
         {followButtonDisabled ? 'TURN ON TWITTER 🔔' : 'TURN ON TWITTER 🔔'}
        </Button>
   </Box>
 </>
  )
  }
    {phase === 10 && (
   <>
  
   <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{backgroundColor: '#242424',  minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
     <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
     APPLICATION STATUS: APPROVED
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
      Congratulations, you're on the allowlist!
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
      Follow @MuhammadAliNFT on Twitter for the latest drop details and updates. Minting will be at this site, https://muhammadalinft.io.
     </Typography>
     <Button
          style={TwitterButtonstyles.button}
          startIcon={<TwitterIcon style={TwitterButtonstyles.icon} sx={{ fontSize: 36 }} />}
          onClick={handleFollowClick}
          disabled={followButtonDisabled}
        >
          {followButtonDisabled ? 'FOLLOW US' : 'FOLLOW US'}
        </Button>
   </Box>
 </>
  )
  }
    {phase === 11 && (
   <>
  
   <Box borderRadius={3}  margin={"2vw"} padding={"3vw"} sx={{backgroundColor: '#242424',  minHeight: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
     <Typography variant="h2" align="center" color="white" sx={{ marginBottom: '2vh' }}>
     APPLICATION STATUS: NOT APPROVED
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
     Sorry, it looks like your wallet address is not approved.
  
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>

     Thank you for your interest, and we hope to see you during the public sale.
     </Typography>
     <Typography variant="body1" align="center" color="white" sx={{ marginBottom: '3vh' }}>
      Follow @MuhammadAliNFT on Twitter for the latest drop details and updates. Minting will be at this site, https://muhammadalinft.io.
     </Typography>
     <Button
          style={TwitterButtonstyles.button}
          startIcon={<TwitterIcon style={TwitterButtonstyles.icon} sx={{ fontSize: 36 }} />}
          onClick={handleFollowClick}
          disabled={followButtonDisabled}
        >
          {followButtonDisabled ? 'FOLLOW US' : 'FOLLOW US'}
        </Button>
   </Box>
 </>
  )
  }
 
</Box>

    </Box>

   
);
}  
export default NewForm;