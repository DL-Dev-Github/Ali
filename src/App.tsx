import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LandingPage from "pages/LandingPage"
import ProjectsPage from "pages/ProjectsPage"
import ProjectPage from "pages/ProjectPage"
import TokenPage from "pages/TokenPage"
import Providers from "components/Providers"
import LoadingScreen from "components/LoadingScreen"
import AllowlistPage from "pages/AllowlistPage"

function App() {
  return (
    <Providers>
      <Router>
      <LoadingScreen />
        <Routes>
          
          <Route index element={<LandingPage/>}/>
          <Route path="projects" element={<ProjectsPage/>}/>
          <Route path="allowlist" element={<AllowlistPage/>}/>
          <Route path="project/:projectId" element={<ProjectPage/>}/>
          <Route path="token/:id" element={<TokenPage/>}/>
        </Routes>
      </Router>
      <ToastContainer
        autoClose={10000}
        position="bottom-right"
        theme="dark"
        newestOnTop
        pauseOnHover
        pauseOnFocusLoss
      />
    </Providers>
  )
}

export default App
