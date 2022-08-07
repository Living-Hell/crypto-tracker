import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({}));

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    
    const {currency} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
      fetchCoins();
    }, [currency])
    
    const darkTheme = createTheme({
        palette: {
          primary : {
            main: "#fff",
          },
          type: "dark",
        }
      });

      const handleSearch = () => {
        return coins.filter(
            (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

      const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style = {{ textAlign: "center"}}>
            <Typography
            variant = "h4"
            style = {{ margin:18, fontFamily: "Roboto" }}
            >
            Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
            label="Search for a Cryptocurrency..." 
            variant="outlined"
            style = {{ marginBottom: 20, width: "80%" }}
            onChange={(e) => setSearch(e.target.value)}
            >
            </TextField>

            <TableContainer>
                {
                    loading? (
                        <LinearProgress style={{ backgroundColor: "#40E0D0"}} />
                    ) : (
                        <Table>
                            <TableHead style = {{backgroundColor: "#ADD8E6"}}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                        style = {{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Roboto",
                                        }}
                                        key = {head}
                                        align = {head === "coin"? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch().map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow
                                        onClick={()=> navigate('/coins/${row.id')}
                                        className = {classes.row}
                                        key = {row.name}
                                        >
                                            <TableCell
                                            component="th"
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                            >
                                            <img
                                            src={row?.image}
                                            alt={row.name}
                                            height="50"
                                            style = {{ marginBottom: 10 }}
                                            ></img>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable