import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import {TrendingCoins} from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignment: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
}));

const Carousel = () => {

    const [trending, setTrending] = useState([])

    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {

        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
        
    };

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line
      }, [currency]);

      const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                src={coin?.image}
                alt={coin?.name}
                height="80"
                style={{ marginBottom: 10 }}
                >
                </img>
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                    style ={{
                        color: profit>0 ? "rgb(14, 203, 129)": "red",
                        fontWeight: 500,
                    }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol}{coin?.current_price.toLocaleString(undefined, {maximumFractionDigits:2})}
                </span>
            </Link>
        )

      });

      const responsive =     {
        0: {
            items: 1,
        },
        1024: {
            items: 4
        },
        512: {
            items: 2
        },
        768: {
            items: 3
        },
      };

  return (
    <div className={classes.carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive = {responsive}
        autoPlay
        disableDotsControls
        disableButtonsControls
        items = {items}
        ></AliceCarousel>
    </div>
  )
}

export default Carousel