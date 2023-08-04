import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Button
  
} from "@mui/material"

//import { Box, Link, Typography } from '@mui/material';
import Masonry from "@mui/lab/Masonry"
import useTheme from "@mui/material/styles/useTheme"
import { PROJECTS_PER_PAGE } from "config"
import { OrderDirection, Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"
import useWindowSize from "hooks/useWindowSize"
import Page from "./Page"
import LoadingScreen from "./LoadingScreen"
import TextSwapper from "./TextSwapper"



const Projects = () => {
  type ContentData = {
    title: string;
    image: string;
    text: string;
    textAlign?: 'left' | 'center' | 'right';
    customStyle?: React.CSSProperties;
    buttonLink?: string;
    buttonLinkTarget?: '_blank' | '_self' | '_parent' | '_top';
    buttonText: string;
    imagePosition?: 'overlay' | 'nextTo';
  };

  const contentData: ContentData[] = [
    {
      title: 'Welcome to Sage Towers',
      image: './media/bg/bg1.png',
      text: 'Embark on an extraordinary journey in a groundbreaking metaverse game that fuses cutting-edge AI with an enthralling world of fantasy and adventure.',
      textAlign: 'center',
      buttonText: 'Read Docs',
      buttonLink: 'https://docs.sagetowers.com/',
      buttonLinkTarget: '_blank',
      imagePosition: 'overlay',
      },
      {
      title: 'Voidrite: The Cataclysm Resource',
      image: './media/bg/bg2.png',
      text: 'Discovered after the Void Cataclysm, it is imbued with raw elemental energy from the fabric of the universe itself. Due to its scarcity and unique properties, it has become highly sought after by crafters and engineers.',
      textAlign: 'left',
      customStyle: {
      justifyContent: 'left',
      },
      buttonText: 'Get Voidrite',
      buttonLink: 'https://app.manifold.xyz/c/sage-towers-eth',
      buttonLinkTarget: '_blank',
      imagePosition: 'overlay',
      },
      {
      title: 'The Metaverse Ready to Embrace AI and Blockchain',
      image: './media/bg/bg3.png',
      text: 'Combining AI-driven gameplay, blockchain technology, and the perfect blend of survival and casual games, Sage Towers is set to capture the imagination of both casual users and hardcore gamers alike.',
      textAlign: 'right',
      customStyle: {
      justifyContent: 'flex-end',
      },
      buttonText: 'Latest News',
      buttonLink: 'https://medium.com/@sagetowers',
      buttonLinkTarget: '_blank',
      imagePosition: 'overlay',
      },
      {
      title: 'Govern the Power of AI',
      image: './media/bg/bg4.png',
      text: 'Help govern a vivid, ever-evolving gaming world along with our "Living NPCs," powered by advanced AI algorithms that give them unique personalities, behavior patterns, and the ability to adapt.',
      textAlign: 'left',
      customStyle: {
      justifyContent: 'flex-start',
      },
      buttonText: 'Make a proposal',
      buttonLink: 'https://snapshot.org/#/sagetowersdao.eth',
      buttonLinkTarget: '_blank',
      imagePosition: 'overlay',
      },
  ];
  
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [highestProjectId, setHighestProjectId] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)
  const { loading, error, data } = useProjects({skip, first, orderDirection})

  useEffect(() => {
    if (data?.projects?.length) {
      const projectIds = data.projects.map((project: Project) => Number(project.projectId))
      const maxProjectId = Math.max(...projectIds)
      if (maxProjectId > highestProjectId) {
        setHighestProjectId(maxProjectId)
      }
    }
  }, [data, data?.projects, highestProjectId])

  interface AnimatedSectionProps {
    content: ContentData;
    id: string;
  }
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ content, id }) => {

 
  const AnimatedBox = Box;
 
  const renderContent = () => (
    <Box  
      bgcolor="rgba(23, 23, 33, 0.7)"
      sx={{
        display: 'flex',
        flexDirection: content.imagePosition === 'nextTo' ? 'row' : 'column',
        alignItems: 'center',
        textAlign: content.textAlign || 'inherit',
        gap: 2,
        maxWidth: '75%',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
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
      <Box>
        <Typography variant="h1">{content.title}</Typography>
        <Typography variant="body1">{content.text}</Typography>
        <Box marginTop={"1rem"} marginBottom={"1rem"}>
        
        </Box>
      </Box>
    </Box>
  );


  return (
    <AnimatedBox
     
      id={id}
      sx={{
        minHeight: '50vh',
        display: 'grid',
        placeItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: content.imagePosition === 'overlay' ? `url(${content.image})` : undefined,
        ...content.customStyle,
      }}
     
    >
      {content.imagePosition === 'overlay' ? (
        renderContent()
      ) : (
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${content.image})`,
            width: '100%',
            height: '100%',
          }}
        >
          {renderContent()}
        </Box>
      )}
    </AnimatedBox>
  );
};
  let width = 280
  const maxColumns = 2
  if (windowSize && !isNaN(windowSize.width)) {
    width = windowSize.width > theme.breakpoints.values.md
      ? (Math.min(windowSize.width, 1200)- 96)*1/maxColumns
        : windowSize.width > theme.breakpoints.values.sm
          ? windowSize.width - 64
          : windowSize.width - 48
  }

  return (
    <Page >
       <LoadingScreen />
       <Box
      bgcolor="rgba(36,36, 36, 1)"
    
      sx={{
        display: "flex",
   
        
       minWidth: "94vw",
       Width: "94vw",
       Height: "100vh",
        maxHeight: "100vh",
      }}
      >
        <Box
        marginLeft={'1vw'}
          sx={{
            flexDirection: "column",
            flex: "0 0 62vw",
            minWidth: "62vw",
            maxWidth: "62vw",
            maxHeight: "69vh",
          }}
        >
          <Box marginLeft={'2vw'}>
          <TextSwapper />
          <div style={{ position: 'fixed', bottom: 100, left: 50 }}>
          <Box marginY={4}>
            <Typography variant="h4">A GENERATIVE ART NFT PROJECT</Typography>
            <Typography variant="h4">BY ZEBLOCKS</Typography>
          </Box>
          <Box marginY={7}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
              }}
              href="/allowlist"
            >
             
            </Button>
          </Box>
          </div>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "0 0 48vw",
            minWidth: "48vw",
            display: "flex",
          
            maxWidth: "48vw",
          zIndex: '10',
          }}
        >
           <div style={{ position: 'fixed', bottom: "4.25vh", right: 0, zIndex: 10  }}>
          <Box>
          <img
          
          src={'./media/section1.jpg'}
      
          style={{
            maxWidth: '100%',
            objectFit: 'fill',
            maxHeight: '85vh',
          }}/>
          </Box>
          </div>
        </Box>
      </Box>
       <Box
      bgcolor="rgba(36,36, 36, 1)"
    
      sx={{
        display: "flex",
   
        
       minWidth: "94vw",
       Width: "94vw",
       Height: "100vh",
        maxHeight: "100vh",
      }}
      >
        <Box
        marginLeft={'1vw'}
          sx={{
            flexDirection: "column",
            flex: "0 0 62vw",
            minWidth: "62vw",
            maxWidth: "62vw",
            maxHeight: "69vh",
          }}
        >
          <Box marginLeft={'2vw'}>
          <TextSwapper />
          <div style={{ position: 'fixed', bottom: 100, left: 50 }}>
          <Box marginY={4}>
            <Typography variant="h4">A GENERATIVE ART NFT PROJECT</Typography>
            <Typography variant="h4">BY ZEBLOCKS</Typography>
          </Box>
          <Box marginY={7}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
              }}
              href="/allowlist"
            >
             
            </Button>
          </Box>
          </div>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "0 0 48vw",
            minWidth: "48vw",
            display: "flex",
          
            maxWidth: "48vw",
          zIndex: '10',
          }}
        >
           <div style={{ position: 'fixed', bottom: "4.25vh", right: 0, zIndex: 10  }}>
          <Box>
          <img
          
          src={'./media/section1.jpg'}
      
          style={{
            maxWidth: '100%',
            objectFit: 'fill',
            maxHeight: '85vh',
          }}/>
          </Box>
          </div>
        </Box>
      </Box>
          
      
    </Page>)
}

export default Projects