import {React, useState} from 'react';
import {AppBar, Toolbar, Box, Typography, Button} from '@mui/material';
import {Grid, Tabs, Tab} from '@mui/material';
import {List, ListItem, ListItemButton, ListItemText, ListItemAvatar, ListItemIcon} from '@mui/material';
import logo from "../../assets/3.png"

export default function Header() {
    const pages = ['Inicio', 'Transacciones', 'Inversiones'];
    const [value, setValue] = useState(0);

    return (
        <AppBar
            position='absolute'>
            <Toolbar>
                <Grid container>
                    <Grid item xs={2}>
                        <Box
                            component="img"
                            sx={{ flexGrow: 0, height: 30}}
                            alt="Your logo."
                            src={logo}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Tabs
                            indicatorColor='secondary'
                            textColor='inherit'
                            value={value}
                            onChange={(e, val) => setValue(val)}
                            >
                                {pages.map((page, index) => (
                                    <Tab key={index} label={page} />
                                    ))}
                            </Tabs>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}