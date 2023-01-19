import React, { ReactElement, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import axios from "axios";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import PostDetailsCard from "../components/PostDetailsCard"
import FeedbackBox from "../components/FeedbackBox"

export interface PostContent {
    type: string;
    value: string;
}

export interface BlobPostLangData {
    date?: string;
    author?: string
    jobTitle?: string
    title?: string
    shortDescription?: string
    content?: Array<PostContent>
}

export interface BlogPostProps {
    id: string
    date: string
    en: BlobPostLangData,
    he: BlobPostLangData
}

export const URL = process.env.REACT_APP_DB_URL || "";

const Blog: FC<any> = (): ReactElement => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState(Array<BlogPostProps>)

    const fetchPosts = async () => {
        const response = await axios.get(`${URL}posts`);
        setPosts(response.data);
    };

    const openPost = (id: string) => {
        navigate(`${window.location.pathname}/${id}`)
    }

    useEffect(() => {
        fetchPosts()
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
                minHeight: "50vh"
            }}
            >
                <Grid container alignContent="flex-end" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {posts.map((post, index) => (
                        <Grid item xs={6} key={post.id} onClick={() => { openPost(post.id) }}>
                            <PostDetailsCard date={post.date} en={post.en} he={post.he} isImageUp={index % 2 === 0} />
                        </Grid>
                    ))}
                </Grid>
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
        </Box>
    )
}

export default Blog