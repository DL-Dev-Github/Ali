import { useParams } from "react-router-dom"
import { CORE_CONTRACT_ADDRESS } from "config"
import PageMuted from "components/PageMuted"
import ProjectDetails from "components/ProjectDetails"
import AllowlistForm from "components/AllowlistForm"
import Page from "components/Page"
import LandingGood from "./LandingGood"
import LandingTwo from "./LandingTwo"
import { Box } from "@mui/material"
import LandingThree from "./LandingThree"
import LandingBot from "./LandingBot"
import Footer from "components/Footer"

const LandingPage = () => {
  const { projectId } = useParams()
  return (
    <PageMuted> 
      {
        <Box>
        <LandingGood/>
        <LandingTwo/>
        <LandingThree/>
        <LandingBot/>
        <Footer/>
        </Box>
      }
    </PageMuted>
  )
}

export default LandingPage