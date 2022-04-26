import React, { useState, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from './contextApi';
import { useNavigate } from 'react-router-dom';
import insta from '../Assets/Instagram.JPG'
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from '@mui/material/Avatar';


export default function Navbar({ userData }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { logout } = useContext(AuthContext)
    const history = useNavigate()

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleprofile = () => {
        history(`/profile/${userData.userId}`)
    }

    const handleclick = ()=>{
        history('/')
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu style={{marginTop:'3.5rem'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleprofile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
            <MenuItem onClick={logout}><LogoutIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu sx={{marginTop:'3rem'}}
            // anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem><MailIcon /><p>&nbsp;&nbsp;</p><p>Messages</p></MenuItem> */}
            {/* <MenuItem><NotificationsIcon /><p>&nbsp;&nbsp;</p><p>Notifications</p></MenuItem> */}
            <MenuItem onClick={handleprofile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
            <MenuItem onClick={logout}><LogoutIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>

        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{background:'white'}}>
                <Toolbar>
                    <div style={{marginLeft:'10%'}} >
                        <img src={insta} style={{width:'20vh'}} onClick={handleclick}></img>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' , color:'grey'} }}>
                        <IconButton size="large" color="inherit">
                            <Badge color="error">
                                <HomeIcon onClick={handleclick} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge color="error">
                                <ExploreIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={userData?.profileUrl} sx={{cursor:'pointer'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            sx={{color:'black'}}                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
