import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export interface BaseColors {
    color: string;
    backgroundColor: string;
}

export default function useChangeColorsOnRoute() {
    const [baseColors, setBaseColors] = useState({
        color: "#000000",
        backgroundColor: "#F0E1F6",
    })
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== "/") {
            setBaseColors({
                color: "#FFFFFF",
                backgroundColor: "#2E2F38",
            })
        } else {
            setBaseColors({
                color: "#000000",
                backgroundColor: "#F0E1F6",
            })
        }
    }, [location])


    return [baseColors]
}