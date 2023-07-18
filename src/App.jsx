import {ThemeProvider, createTheme } from '@mui/material/styles';

import Header from "./Components/Header/Header";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#45b5c4',
      darker: '#1693a5',
      contrastText: "#c7ede8"
    },
    neutral: {
      main: '#7ececa',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Cabin"',
    ].join(','),
  }
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
};
export default App;
