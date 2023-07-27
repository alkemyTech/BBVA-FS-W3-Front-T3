import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Avatar,
  Button,
  Snackbar,
  Box,
} from '@mui/material';
import { Flag as FlagIcon } from '@mui/icons-material';
import argentinaFlag from '../../assets/argentina.png';
import usaFlag from '../../assets/usa.png';

const ExchangeCard = () => {
  const [amount, setAmount] = useState('');
  const [toUSD, setToUSD] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currencyTitle, setCurrencyTitle] = useState('ARS');
  const [currencyFlag, setCurrencyFlag] = useState('argentina');
  const [exchangeRate, setExchangeRate] = useState(547);

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleExchange = () => {
    if (toUSD) {
      return (amount / 542).toFixed(2); 
    } else {
      return (amount * 547).toFixed(0); 
    }
  };

  const handleConfirmChange = () => {
    if (toUSD) {
      setCurrencyTitle('USD');
      setCurrencyFlag('usa');
      setExchangeRate(542);
    } else {
      setCurrencyTitle('ARS');
      setCurrencyFlag('argentina');
      setExchangeRate(547);
    }
    setToUSD((prevToUSD) => !prevToUSD); 
    setAmount(''); 
  };
  const confirmarCambio = () => {
    if (amount.trim() !== '') {
      setShowSnackbar(true);
  }
  }
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box
    marginTop="100px"
  >
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Convertidor de Moneda - {currencyTitle}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Avatar src={currencyFlag === 'argentina' ? argentinaFlag : usaFlag}>
              <FlagIcon />
            </Avatar>
            <Typography variant="h6" component="h3" gutterBottom>
              {currencyTitle}
            </Typography>
            <TextField
              label={`Moneda ${currencyTitle}`}
              type="number"
              value={amount}
              onChange={handleChangeAmount}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Avatar src={currencyFlag === 'argentina' ? usaFlag : argentinaFlag}>
              <FlagIcon />
            </Avatar>
            <Typography variant="h6" component="h3" gutterBottom>
              {toUSD ? 'USD' : 'ARS'}
            </Typography>
            <TextField
              label={`${toUSD ? 'Dólares' : 'Pesos'} ${toUSD ? 'USD' : 'ARS'}`}
              type="number"
              value={handleExchange()}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={confirmarCambio} style={{ marginTop: '25px'}}>
          Confirmar Cambio
        </Button>
        <Button variant="contained" color="secondary" onClick={handleConfirmChange} style={{ marginTop: '25px' }}>
          {toUSD ? 'Cambiar a ARS' : 'Cambiar a USD'}
        </Button>
        <Grid container spacing={2} style={{ marginTop: '100px'}}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h3" gutterBottom>
              Valor del Dólar Compra
            </Typography>
            <Typography variant="body1" gutterBottom>
              547
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h3" gutterBottom>
              Valor del Dólar Venta
            </Typography>
            <Typography variant="body1" gutterBottom>
              542
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        message="Cambio realizado"
        autoHideDuration={3000}
      />
    </Card>
    </Box>
    
  );
};
export default ExchangeCard;

