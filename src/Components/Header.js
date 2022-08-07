import React from 'react';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, ThemeProvider } from "@material-ui/core";
import { makeStyles} from '@material-ui/styles';
import { useNavigate } from "react-router-dom";
import { createTheme } from '@material-ui/core/styles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() =>({
  title:{
    flex: 1,
    color: "#9FE2BF",
    fontFamily: "Roboto",
    fontWeight: "bold",
    cursor: "pointer",
  }
}))

const Header = () => {

  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary : {
        main: "#fff",
      },
      type: "dark",
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color = 'transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography 
          onClick = {() => navigate("/crypto-tracker/")}
          className={classes.title}
          variant = 'h5'>
            Crypto Tracker
          </Typography>

          <Select
            variant='outlined'
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value = { currency }
          onChange = {(e) => setCurrency(e.target.value)}
          >
            <MenuItem value = "USD">USD</MenuItem>
            <MenuItem value = "INR">INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header