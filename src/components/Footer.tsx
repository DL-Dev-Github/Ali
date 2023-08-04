import { useState } from "react"
import { 
  Box,
  Link,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Connect from "components/Connect"
import { Typography } from "@mui/material"
import { width } from "@mui/system"

const items = [
  {
    label: "",
    url: "/",
    enabled: true
  }

]

const socialMediaIcons = (
  <>
    <Link href="/">
      <img src="/media/icon_OS_gold.svg" alt="Opensea" height={"32px"} width={"32px"} />
    </Link>
    <Link href="/">
      <img src="/media/icon_TW_gold.svg" alt="Twitter" height={"32px"} width={"32px"} />
    </Link>
  </>
);
const Footer = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <List dense>
        {items.map((item) => (
          <ListItem sx={{"&:hover": {backgroundColor: "#000000"}}} key={item.label} disablePadding>
            <ListItemButton component={Link} href={item.url} sx={{textAlign: "left", pointerEvents: item.enabled ? "auto" : "none"}}>
              <ListItemText primary={item.label} primaryTypographyProps={{fontSize: 18, fontWeight: 600, color: item.enabled ? "primary" : "lightgrey"}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
{socialMediaIcons}
</Box>
    </Box>
  )
  return (

    <Box height={"15vh"} sx={{width: "100%", display: "flex", justifyContent: "center", backgroundColor: "#000000 "}}>
   
      <AppBar component="nav"  position="sticky" elevation={1} sx={{backgroundColor: "#000000 ", boxShadow: 0, zIndex: 0}}>
        <Toolbar sx={{width: "100%", display: "flex", margin: "auto", justifyContent: "space-between", backgroundColor: "#000000 "}}>
          
        <Box  sx={{   alignContent:'center',   justifyContent:  "space-between",  width: '100%', height : "100%" , display: { xs: 'none', sm: 'none', md:'flex' }}}      >
        <Link height={"10vh"} href="/" underline="hover" padding={"2.5vh"} sx={{
            pl:5,  pr:0,
              color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' }, alignItems: 'center'
            }}>
             
                <img src={"/media/sig.png"}  width = {"125px"} height = {"40px"}   />
            </Link>  
            <Link href="/" underline="hover" padding={"10px"} sx={{
            pl:0,  pr:0,
              color: '#111c24', display: {xs: 'block', sm: 'block', md:'none' }, alignItems: 'center'
            }}>
                <img src={"/media/sig.png"} width = {"100%"} height = {"70%"}   />
            </Link>  
         <Box padding={2}  maxWidth={'33%'} >
         <Typography variant="body1" align='center' alignContent={'center'} textAlign={"center"}    fontSize={'0.70rem'}   sx={{ alignContent:"center", justifyContent:"center", color: '#ffffff', fontWeight:300}}> 
         Ali™, Muhammad Ali™ and the Muhammad Ali signature are trademarks of Muhammad Ali Enterprises LLC Rights of Publicity and Persona Rights: Muhammad Ali Enterprises LLC
Photo by Ken Regan© 2023 Muhammad Ali Enterprises LLC ali.com
        </Typography>
        </Box>
         <Box padding={4 } minWidth='146px'>
    
         <Typography  variant="subtitle2" align='center'  fontSize={'0.65rem'} sx={{ verticalAlign:"top", color: '#ffffff', fontWeight:300}}> 
         <Box>
       
         <a href="https://opensea.io/collection/the-greatest-muhammad-ali-x-zeblocks-mint-pass" target="_blank">
            <img src={'/media/icon_OS_gold.svg'} width = {"36px"} height = {"36px"}   />
            </a>
              <a href="https://twitter.com/muhammadalinft" target="_blank">
            <img src={'/media/icon_TW_gold.svg'} width = {"36px"} height = {"36px"}   />
            </a>
         
            </Box>

</Typography>
         </Box>
        
         </Box>
         
        <Box height={"25vh"}   sx={{   width: '100%', height : "100%" , display: { xs: 'flex', sm: 'flex', md:'none' }}}      >
          <Box height={"25vh"} margin={2} >
            
          <Box display={{xs: 'flex', sm: 'flex', md:'none'}} justifyContent="center" alignItems="center">
  <img src={"/media/sig.png"} width={"40%"} height={"20%"} />
</Box>
                <Box margin={4} >
         <Typography variant="body1" textAlign={"center"}   fontSize={'0.65rem'}   sx={{ alignContent:"center", justifyContent:"center", color: '#ffffff', fontWeight:300}}> 
         Ali™, Muhammad Ali™ and the Muhammad Ali signature are trademarks of Muhammad Ali Enterprises LLC Rights of Publicity and Persona Rights: Muhammad Ali Enterprises LLC
Photo by Ken Regan© 2023 Muhammad Ali Enterprises LLC ali.com
        </Typography>
        </Box>
        <Box  bgcolor="rgba(0,0, 0, 1)" margin={1} sx={{
        
          align:'center',
              color: '#000000', 
              alignContent:"center", justifyContent:"center",
            }} >
                                    <Typography  bgcolor="#000000" align='center' variant="subtitle2"  fontSize={'0.70rem'} sx={{ marginBottom:"10px", color: '#000000', fontWeight:300}}> 

                                   
            
          
             <a href="https://opensea.io/collection/the-greatest-muhammad-ali-x-zeblocks-mint-pass" target="_blank">
            <img src={'/media/icon_OS_gold.svg'} width = {"36px"} height = {"36px"}   />
            </a>
              <a href="https://twitter.com/muhammadalinft" target="_blank">
            <img src={'/media/icon_TW_gold.svg'} width = {"36px"} height = {"36px"}   />
            </a>
            
            
        
            
            
</Typography>
         </Box>
         </Box>


        
         </Box>
         

        </Toolbar>
        
      </AppBar>
      
    </Box>
  )
}

export default Footer