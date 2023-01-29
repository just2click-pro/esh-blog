import React, { ReactElement, FC, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios";

import { Button, Box, Typography } from "@mui/material"

import { useStateContext } from '../context/StateContext'
import { boxPage, feedbackBox, notificationWrapper } from "../common/styling"
import FeedbackBox from "../components/FeedbackBox"
import { BlogPostProps, URL } from "./Blog"

const Post: FC<any> = (): ReactElement => {
    const { state } = useStateContext()
    const navigate = useNavigate()
    const params = useParams()
    const { t } = useTranslation(['main'])
    const [post, setPost] = useState<BlogPostProps>({
        id: "-1",
        metadata: "",
        content: ""
    })

    const fetchPost = async () => {
        axios.get(`${URL}${state.lang}/${params.id}`)
            .then(res => setPost(res.data))

    };

    useEffect(() => {
        fetchPost()
    }, [, state.lang])

    return (
        <Box
            sx={boxPage}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                margin: "2em 0",
                width: "50%",
                alignItems: "start",
            }}>
                <Button variant="text" onClick={() => { navigate(-1) }} >
                    <Typography
                        textAlign="center"
                        sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "700", color: "#2E2F38" }}>
                        {t("post.back", { ns: ['main'] })}
                    </Typography>
                </Button>
                <ReactMarkdown>{post.content}</ReactMarkdown>
                <Box sx={notificationWrapper}>
                    <Typography
                        textAlign="left"
                        sx={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: "600", color: "#6A6D82 " }}>
                        {t("post.notification", { ns: ['main'] })}
                    </Typography>
                </Box>

            </Box>
            <Box sx={feedbackBox}>
                <FeedbackBox />
            </Box>
        </Box>)
}

export default Post