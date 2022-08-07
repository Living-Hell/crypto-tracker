import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';


const useStyles = makeStyles(() =>({
    banner: {
        backgroundImage: 'url(./Banner2.jpg)'
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        height: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}));

const Banner = () => {

    const classes = useStyles();

  return (
    <div className={classes.banner} style= {{ backgroundImage: 'url(https://www.hospiceofmiamicounty.org/wp-content/uploads/2016/10/video-bg.jpg' }}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant="h2"
                style = {{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Roboto",
                    color: "#89CFF0",
                }}
                >
                Crypto Tracker
                </Typography>
                <Typography
                variant="subtitle2"
                style = {{
                    color:"darkgrey",
                    fontFamily: "Roboto"
                }}
                >
                    Get all the information related to your favourite Crypto at one place!
                </Typography>
            </div>
            <Carousel></Carousel>
        </Container>
    </div>
  );
};

export default Banner