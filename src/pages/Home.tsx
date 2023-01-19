import React, { ReactElement, FC, useState } from "react";
import { Box, Typography } from "@mui/material"

import card from "../assets/card.mp4"
import cover from "../assets/cover.mp4"

import "../index.css"

import useChangeColorsOnRoute from "../hooks/useChangeColorsOnRoute";

const Home: FC<any> = (): ReactElement => {
    const [homePageColors, setHomePageColors] = useChangeColorsOnRoute()

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: `${homePageColors.backgroundColor}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <video className="videoCard" autoPlay loop muted playsInline>
                <source src={card} type='video/mp4' />
            </video>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0.2em 0",
                zIndex: "99"
            }}
            >
                <video className="videoCover" autoPlay loop muted playsInline>
                    <source src={cover} type='video/mp4' />
                </video>
            </Box>
        </Box>)
}

export default Home