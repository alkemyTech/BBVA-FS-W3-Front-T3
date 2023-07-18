import {React, useState} from 'react';

import {AppBar, Toolbar, Box, Button} from '@mui/material';
import {Grid, Tabs, Tab} from '@mui/material';

import logo from "../../assets/3.png"

function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

export default function Header() {
    const pages = ['inicio', 'transacciones', 'depositos', 'inversiones'];
    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (
        <AppBar
            position='absolute'>
            <Toolbar>
                <Grid container sx={{placeItems:'center'}}>
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
                    <Grid item xs={1}/>
                    <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/loginIn"> LogIn </Button>                        
                    </Grid>
                    <Grid item sx={{marginLeft:'auto'}}>
                            <Button variant='contained' color='secondary' href="/signUp"> SignUp </Button>                        
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}