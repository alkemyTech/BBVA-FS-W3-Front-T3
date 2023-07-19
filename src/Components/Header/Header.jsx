import {React, useState} from 'react';

import {AppBar, Toolbar, Tooltip, Box, IconButton} from '@mui/material';
import {Typography} from '@mui/material';
import {Menu, MenuItem} from '@mui/material';
import {Grid, Tabs, Tab} from '@mui/material';

import logo from "../../assets/3.png"
import CustomAvatar from '../Icons/CustomAvatar';

export default function Header() {
    const pages = ['inicio', 'transacciones', 'depositos', 'inversiones'];
    const settings = ['Logout'];
    
    const [value, setValue] = useState(0);
    const [anchorElUser, setAnchorElUser] = useState(null);
 
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position='absolute'>
            <Toolbar>
                <Grid container sx={{placeItems:'center'}} spacing={2}>
                    <Grid item xs={1}>
                        <Box
                            component="img"
                            sx={{height: 30}}
                            alt="Your logo."
                            src={logo}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Tabs
                            indicatorColor='secondary'
                            textColor='inherit'
                            value={value}
                            onChange={handleChange}
                            >
                                {pages.map((page, index) => (
                                    <Tab key={index} label={page} href={"/"+page}/>
                                    ))}
                            </Tabs>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item sx={{placeContent:'left'}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                <CustomAvatar color='#45b5c4'/>
                            </IconButton>

                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                    {/* <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/loginIn"> LogIn </Button>                        
                    </Grid>
                    <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/signUp"> SignUp </Button>                        
                    </Grid> */}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}