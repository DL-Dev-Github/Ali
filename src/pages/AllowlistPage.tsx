import { useParams } from "react-router-dom"
import { CORE_CONTRACT_ADDRESS } from "config"
import PageMuted from "components/PageMuted"
import ProjectDetails from "components/ProjectDetails"
import AllowlistForm from "components/AllowlistForm"

const AllowlistPage = () => {
  const { projectId } = useParams()
  return (
    <PageMuted> 
      {
        <AllowlistForm/>
      }
    </PageMuted>
  )
}

export default AllowlistPage