import React, { ReactElement, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios";

import { Button, Box, Typography } from "@mui/material"

import { useStateContext } from '../context/StateContext';
import FeedbackBox from "../components/FeedbackBox"
import { BlogPostProps, BlobPostLangData, PostContent, URL } from "./Blog"

const Post: FC<any> = (): ReactElement => {
    const { state } = useStateContext()
    const navigate = useNavigate()
    const params = useParams()
    const { t } = useTranslation(['main'])
    const [post, setPost] = useState<BlogPostProps>()
    const [data, setData] = useState<BlobPostLangData>()
    const [commonDate, setCommonDate] = useState("")

    const fetchPost = async () => {
        const response = await axios.get(`${URL}posts/${params.id}`);
        setPost(response.data);
        setCommonDate(response.data.date)
    };

    useEffect(() => {
        setData(state.lang === "en" ? {
            date: new Date(commonDate).toLocaleDateString("en-US"),
            author: post?.en.author,
            jobTitle: post?.en.jobTitle,
            title: post?.en.title,
            shortDescription: post?.en.shortDescription,
            content: post?.en.content
        } : {
            date: new Date(commonDate).toLocaleDateString("en-US"),
            author: post?.he.author,
            jobTitle: post?.he.jobTitle,
            title: post?.he.title,
            shortDescription: post?.he.shortDescription,
            content: post?.he.content
        })
    }, [state.lang,
        data, commonDate,
    post?.en.author, post?.en.jobTitle, post?.en.title, post?.en.shortDescription, post?.en.content,
    post?.he.author, post?.he.jobTitle, post?.he.title, post?.he.shortDescription, post?.he.content
    ])


    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                height: "100vh",
                overflow: "auto",
            }}
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
                <Typography
                    textAlign="left"
                    sx={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: "600", color: "#6A6D82 " }}>
                    {data?.date}&nbsp;*&nbsp;{t("post.by", { ns: ['main'] })}&nbsp;{data?.author}
                </Typography>
                <Typography
                    textAlign="left"
                    variant="h4"
                    sx={{ fontFamily: "Montserrat", fontWeight: "600", padding: "2rem 0 1rem" }}>
                    {data?.title}
                </Typography>
                <Typography
                    textAlign="left"
                    variant="h6"
                    sx={{ fontFamily: "Montserrat", fontWeight: "600", padding: "1rem 0 1rem" }}>
                    {data?.shortDescription}
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "start",
                    overflow: "auto"
                }}>
                    {
                        data && data.content ?
                            data.content.map((line: PostContent) => {
                                if (line.type === "p") {
                                    return (
                                        <p>
                                            <Typography
                                                sx={{ fontFamily: "Montserrat", fontSize: "12px", fontWeight: "500", color: "#2E2F38" }}>
                                                {line.value}
                                            </Typography>
                                        </p>
                                    );
                                } else {
                                    return (
                                        <Typography
                                            sx={{ fontFamily: "Montserrat", fontWeight: "600", padding: "1rem 0 1rem" }}>
                                            {line.value}
                                        </Typography>
                                    );
                                }
                            })
                            : null
                    }
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "1px solid #B9BBC6",
                    padding: "2rem 0",
                    width: "100%",
                    alignItems: "start",
                }}>
                    <Typography
                        textAlign="left"
                        sx={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: "600", color: "#6A6D82 " }}>
                        {t("post.notification", { ns: ['main'] })}
                    </Typography>
                </Box>

            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "3rem",
                paddingTop: "3rem",
            }}
            >
                <FeedbackBox />
            </Box>
        </Box>)
}

export default Post