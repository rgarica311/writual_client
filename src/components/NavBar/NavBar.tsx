'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
//import { colors } from 'utils/colors';
import { Autocomplete, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<any>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [ menuItems, setMenuItems ] = React.useState(['Project', 'Scenes', 'Characters'])    
  const theme = useTheme()




  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const searchStyle = {
    maxHeight: "100%", 
    minWidth: "480px",
    borderRadius: "50px",
    margin: "0px",
    display: "flex", 
    alignItems: "center",
   
}

const handleInputChange = (event, newInputValue) => {
  console.log(`navbar handleInputChange value: `, newInputValue)
  setInputValue(newInputValue);
}

  return (
    <AppBar color="secondary" position="static" sx={{marginBottom: "10px", borderRadius: "5px", display: "flex", alignItems: "center", height: "48px"}}>
      <Container maxWidth={false} disableGutters sx={{height: "100%", width: "100%", display: "flex", flexDirection: "row",  alignItems: "center"}}>
        <Link style={{textDecoration: "none", color: "white"}} href="/projects">
          <Typography sx={{fontWeight: 'bold', letterSpacing: 1.5, marginRight: "20px", marginLeft: "10px", color: "#FFFAE3"}}>WRITUAL</Typography>
        </Link>

        <Autocomplete
            sx={{"&.MuiOutlinedInput-root": {backgroundColor: "#EFF1F3"}}}
            value={value}
            multiple
            inputValue={inputValue}
            onInputChange={handleInputChange}
            freeSolo
            id="search"
            options={menuItems}
            renderInput={(params) =>  <TextField {...params} InputProps={{ sx: { 
              '&::placeholder':  {
              color: 'black',
            }, borderRadius: "50px", backgroundColor: theme.palette.background.paper, height: "32px", width: "480px" } }} sx={searchStyle} id="select-multiple-chip" placeholder="Project Title, User, etc"/>}
        />
       
      </Container>
      
    </AppBar>
  );
}
