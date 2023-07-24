import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from "../../assets/3.png";
import { Link } from 'react-router-dom';

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
      { id: '',  },
      { id: '',  },
     
     
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

export default function Navigator({ isOpen, ...other }) {



  return (
    <Drawer
      variant="permanent"
      {...other}
      sx={{
        backgroundColor: "#1693a5",
        position: "fixed",
        zIndex: 0,
        width: isOpen ? 240 : 0, // Define the width of the drawer based on the isOpen state
        transition: "width 1.3s", // Add a transition for the width change
      }}
    >
      <List disablePadding sx={{ backgroundColor: '#1693a5', zIndex: 0 }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, backgroundColor: '#1693a5' }}>
          <Box
            component="img"
            sx={{ height: 30 }}
            alt="Your logo."
            src={logo}
          />
        </ListItem>
        <ListItem sx={{ backgroundColor: '#1693a5' }}>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ backgroundColor: '#45b5c4' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#1693a5' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                {/* Usa el componente Link para envolver el ListItemButton */}
                <Link to={`/${childId.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        <ListItem sx={{ py: "100%", px: 0, backgroundColor: '#1693a5' }}>

        </ListItem>
      </List>
    </Drawer>
  );
}