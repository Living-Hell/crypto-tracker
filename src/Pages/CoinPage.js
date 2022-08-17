import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from "../CryptoContext"
import { SingleCoin } from "../config/api"
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import ReactHtmlParser from "react-html-parser";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: " 3px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Roboto"
    },
    description: {
      width: "100%",
      fontFamily: "Robot",
      padding: 25,
      textAlign: "justify",
      paddingBottom: 15,
      paddingTop: 0,
    },
    marketData: {
      alignSelf: "start",
      width: "100%",
      paddingTop: 10,
      padding: 25,
      [theme.breakpoints.down("md")]:{
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]:{
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]:{
        alignItems: "start",
      },
    },
}));

const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  
  //console.log(coin);

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  if(!coin) return <LinearProgress style={{ backgroundColor: "#40E0D0"}} />;

  return (
    <div className={classes.container}>

      <div className={classes.sidebar}>
        <img
        src= {coin?.image.large}
        alt= {coin?.name}
        height= "200"
        style= {{ marginBottom: 20 }}
        >
        </img>

        <Typography variant = "h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography varian = "subtitle1" className={classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className= {classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant = "h5" className= {classes.heading}>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant = "h5" style= {{ fontFamily: "Roboto"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant = "h5" className= {classes.heading}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant = "h5" style= {{ fontFamily: "Roboto"}}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant = "h5" className= {classes.heading}>Market Cap:{" "}</Typography>
            &nbsp; &nbsp;
            <Typography variant = "h5" style= {{ fontFamily: "Roboto"}}>
            {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0,-6)
              )} M
            </Typography>
          </span>
        </div>
      </div>

      {/* Chart */}
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage