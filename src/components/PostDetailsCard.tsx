import React, { FC, ReactElement, useEffect, useRef } from 'react'

import ReactMarkdown from 'react-markdown'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box, CardActionArea } from '@mui/material';

import { cardVideoStyle, cardImageStyle } from '../common/styling';
import { BlogPostProps } from "../pages/Blog"

import cardImage from "../assets/card-image.png"
import card from "../assets/card.mp4";

type CardAreADataProps = {
    post: BlogPostProps,
    isImageUp: boolean;
}

export const PostDetailsCard: FC<CardAreADataProps> = ({ post, isImageUp }): ReactElement => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const populateStyleAttrs = (element: React.MutableRefObject<HTMLVideoElement | HTMLImageElement | null>, styles: any) => {
        if (element && element.current) {
            for (let attr in styles) {
                element.current.style.setProperty(attr, styles[attr])
            }
        }
    }

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

    useEffect(() => {
        populateStyleAttrs(videoRef, cardVideoStyle)
        populateStyleAttrs(imgRef, cardImageStyle)
    }, [])

    return (
        <Card sx={{ height: "20.875rem", width: "20.875rem" }} onMouseEnter={handleImageMouseEnter} onMouseLeave={handleImageMouseLeave}>
            <CardActionArea>
                {isImageUp ?
                    <CardMedia
                        sx={{ position: "relative" }}>
                        <video ref={videoRef} src={card}
                            style={{
                                objectFit: "cover",
                                borderTopLeftRadius: "10.44rem",
                                borderTopRightRadius: "10.44rem"
                            }} />
                        <img ref={imgRef} src={cardImage} alt=""
                            style={{
                                objectFit: "cover",
                                borderTopLeftRadius: "10.44rem",
                                borderTopRightRadius: "10.44rem"
                            }} />
                    </CardMedia>
                    : <></>
                }
                <CardContent sx={{ height: "11.525rem", fontFamily: "Montserrat" }}>
                    <ReactMarkdown>{post.metadata}</ReactMarkdown>
                </CardContent>
                {!isImageUp ?
                    <Box sx={{ transform: "rotate(180)" }}>
                        <CardMedia
                            sx={{ position: "relative" }}>
                            <video ref={videoRef} src={card}
                                style={{
                                    objectFit: "cover",
                                    borderBottomLeftRadius: "10.44rem",
                                    borderBottomRightRadius: "10.44rem"
                                }} />
                            <img ref={imgRef} src={cardImage} alt=""
                                style={{
                                    objectFit: "cover",
                                    borderBottomLeftRadius: "10.44rem",
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