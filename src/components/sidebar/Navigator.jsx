import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import logo from "../../assets/3.png";

const categories = [
  {
    children: [
      {
        id: 'Inicio',
        icon: <PeopleIcon />,
        active: true,
      },
      { id: 'Transferencias', icon: <DnsRoundedIcon /> },
      { id: 'Depositos', icon: <PermMediaOutlinedIcon /> },
      { id: 'Inversiones', icon: <PublicIcon /> },
      { id: 'Plazos Fijos', icon: <SettingsEthernetIcon /> },
      {
        id: 'Compra Dolares',
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    children: [
      { id: 'Cuenta', icon: <SettingsIcon /> },
      { id: 'Log Out', icon: <TimerIcon /> },
      
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer  variant="permanent"
    {...other}
    sx={{
      backgroundColor: "#1693a5",
      position: "fixed", // Position fixed to keep the Navigator on the screen
      zIndex: 1, // Set a lower z-index to keep it below other elements
    }}
  >
      <List disablePadding sx={{ backgroundColor: '#1693a5', zIndex: 0 }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, backgroundColor:'#1693a5' }}>
        <Box
              component="img"
              sx={{ height: 30 }}
              alt="Your logo."
              src={logo}
            />
        </ListItem>
        <ListItem sx={{ backgroundColor:'#1693a5' }}>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ backgroundColor:'#45b5c4' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color:'#1693a5' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        <ListItem  sx={{ py: "100%", px: 0, backgroundColor:'#1693a5' }}>
          
              </ListItem>
      </List>
    </Drawer>
  );
}