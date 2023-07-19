import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App.jsx'

import './index.css'

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
    secondary: {
      main: '#c7ede8',
      contrastText: '#000',
    }
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter> 
)
