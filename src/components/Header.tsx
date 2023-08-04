
import React, { useState } from "react";
import "../index.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { CustomConnectButton } from "./CustomConnectButton";
import AllowlistButton from "./AllowlistButton";
import AllowlistButtonSmall from "./AllowlistButtonSmall";

const navItems = [

  {
    label: '',
    url: '/'
  },

]
const DRAWER_WIDTH = 340;

const Header = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        
        
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <ListItemButton component={Link} href={item.url} sx={{  textAlign: 'center'}}>
              <ListItemText primary={item.label} /> 
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ m: 2 }}>
      
      </Box>
      <CustomConnectButton/>

      <Link href="https://opensea.io/collection/the-greatest-muhammad-ali-x-zeblocks-mint-pass" target="_blank" underline="hover" sx={{
  color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' } , alignItems: 'right'
  }}>
  <img src={'/media/icon_OS_gold.svg'} width = {"42px"} height = {"42px"} />
</Link>
      <Link href="https://twitter.com/muhammadalinft" target="_blank" underline="hover" sx={{
  color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' } , alignItems: 'right'
}}>
  <img src={'/media/icon_TW_gold.svg'} width = {"42px"} height = {"42px"} />
</Link>

          
      
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
  
  <AppBar component="nav" position="static" elevation={1} sx={{ backgroundColor: '#000' }}>
        <Toolbar sx={
          {
            width: '100%',
            display: 'flex',
            margin: 'auto',
            justifyContent: 'space-between',
          }
        }>
          <Box sx={{ display: 'none', alignItems: 'center' }}>
          
            <Box sx={{   width: '100%', height : "100%" ,
            display: { xs: 'none', sm: 'none', md:'none' },color:'#111c24' , fontWeight:'700'}}>
            
              {navItems.map((item) => (
                <Link key={item.label}  href={item.url} sx={{ml: 0, fontStyle:"bold", fontSize:"1.2rem", color: '#111c24'}}>
                  { item.label }
                </Link>
              ))}
           
       
            </Box>
        
          </Box>

          <Link href="/" underline="hover"  paddingTop={"2vh"}  paddingBottom={"-2vh"} sx={{
            pl:0,  pr:0,
              color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' }, alignItems: 'center'
            }}>          
            <img src={"/media/sig.png"}  width = {"30%"} height = {"30%"}   />
            </Link>  
            <Link href="/" underline="hover" padding={"0px"} sx={{
            pl:0,  pr:0,
              color: '#111c24', display: {xs: 'block', sm: 'block', md:'none' }, alignItems: 'center'
            }}>
            <img src={"/media/sig.png"} width = {"30%"} height = {"30%"}   />
            </Link>  
            <Box sx={{ display: { xs: 'flex', sm: 'flex', md:'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { sm: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            </Box>
            <Box paddingTop={"10px"} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="https://opensea.io/collection/the-greatest-muhammad-ali-x-zeblocks-mint-pass" target="_blank" underline="hover" sx={{
  color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' } , alignItems: 'right'
  }}>
  <img src={'/media/icon_OS_gold.svg'} width = {"42px"} height = {"42px"} />
</Link>
            <Link href="https://twitter.com/muhammadalinft" target="_blank" underline="hover" sx={{
  color: '#111c24', display: {xs: 'none', sm: 'none', md:'block' } , alignItems: 'right'
}}>
  <img src={'/media/icon_TW_gold.svg'} width = {"42px"} height = {"42px"} />
</Link>

      
          <Box   sx={{padding : 0, margin:0, display: {xs: 'none', sm: 'none', md:'block' } }}>
            <CustomConnectButton/>
            </Box>
            </Box>
            
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor="left"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: '#000',
            },
          }}
        >
          {drawer}
        
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
