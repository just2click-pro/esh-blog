import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

import { useStateContext } from '../context/StateContext';
import cardImage from "../assets/card-image.png"
import card from "../assets/card.mp4";

import { BlobPostLangData } from "../pages/Blog"

type CardAreADataProps = {
    date: string;
    en: BlobPostLangData
    he: BlobPostLangData
    isImageUp: boolean;
}

interface CardAreAData {
    date?: string;
    author?: string;
    jobTitle?: string;
    title?: string;
    shortDescription?: string;
    isImage?: boolean;
}

export const PostDetailsCard: FC<CardAreADataProps> = ({ date, en, he, isImageUp }): ReactElement => {
    const { state } = useStateContext()
    const [data, setData] = useState<CardAreAData>({})
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleImageMouseEnter = () => {
        if (videoRef.current && imgRef.current) {
            videoRef.current.style.visibility = "visible";
            imgRef.current.style.visibility = "hidden"
            videoRef.current.play()
        }
    }

    const handleImageMouseLeave = () => {
        if (videoRef.current && imgRef.current) {
            videoRef.current.style.visibility = "hidden";
            imgRef.current.style.visibility = "visible";
            videoRef.current.pause();
        }
    }

    const dateObj = useMemo(() => new Date(date), [date])

    useEffect(() => {
        setData(state.lang === "en" ? {
            date: dateObj.toLocaleDateString("en-US"),
            author: en.author,
            jobTitle: en.jobTitle,
            title: en.title,
            shortDescription: en.shortDescription,
        } : {
            date: dateObj.toLocaleDateString("en-US"),
            author: he.author,
            jobTitle: he.jobTitle,
            title: he.title,
            shortDescription: he.shortDescription,
        })
    }, [state.lang, dateObj, en.author, en.jobTitle, en.shortDescription, en.title, he.author, he.jobTitle, he.shortDescription, he.title])

    return (
        <Card sx={{ height: "20.875rem", width: "20.875rem" }} onMouseEnter={handleImageMouseEnter} onMouseLeave={handleImageMouseLeave}>
            <CardActionArea>
                {isImageUp ?
                    <CardMedia
                        sx={{ position: "relative" }}>
                        <video ref={videoRef} src={card}
                            style={{
                                visibility: "hidden",
                                width: "100%",
                                height: "9.35rem",
                                objectFit: "cover",
                                borderTopLeftRadius: "10.44rem",
                                borderTopRightRadius: "10.44rem"
                            }} />
                        <img ref={imgRef} src={cardImage} alt=""
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "9.35rem",
                                objectFit: "cover",
                                borderTopLeftRadius: "10.44rem",
                                visibility: "visible",
                                borderTopRightRadius: "10.44rem"
                            }} />
                    </CardMedia>
                    : <></>
                }
                <CardContent sx={{ height: "11.525rem", fontFamily: "Montserrat" }}>
                    <Typography component="div" sx={{ display: "flex", justifyContent: "flex-start" }}>
                        <Typography variant="subtitle2" sx={{ fontFamily: "Montserrat" }}>
                            {data.date}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontFamily: "Montserrat" }}>&nbsp;-&nbsp;</Typography>
                        <Typography variant="subtitle2" sx={{ fontFamily: "Montserrat" }}>
                            {data.author}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: "Montserrat" }}>
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Montserrat" }}>
                        {data.shortDescription}
                    </Typography>
                </CardContent>
                {!isImageUp ?
                    <Box sx={{ transform: "rotate(180)" }}>
                        <CardMedia
                            sx={{ position: "relative" }}>
                            <video ref={videoRef} src={card}
                                style={{
                                    visibility: "hidden",
                                    width: "100%",
                                    height: "9.35rem",
                                    objectFit: "cover",
                                    borderBottomLeftRadius: "10.44rem",
                                    borderBottomRightRadius: "10.44rem"
                                }} />
                            <img ref={imgRef} src={cardImage} alt=""
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "9.35rem",
                                    objectFit: "cover",
                                    borderBottomLeftRadius: "10.44rem",
                                    visibility: "visible",
                                    borderBottomRightRadius: "10.44rem"
                                }} />
                        </CardMedia>

                    </Box> : <></>

                }
            </CardActionArea>
        </Card >
    )
}

export default PostDetailsCard;