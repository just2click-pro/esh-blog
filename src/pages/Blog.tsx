import React, { ReactElement, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import axios from "axios";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { boxPage, feedbackBox } from "../common/styling"
import PostDetailsCard from "../components/PostDetailsCard"
import FeedbackBox from "../components/FeedbackBox"
import { useStateContext } from '../context/StateContext'

export interface BlogPostProps {
    id: string
    metadata: string
    content: string
}

export const URL = process.env.REACT_APP_DB_URL || "";

const gridBox = {
    display: "flex",
    flexDirection: "column",
    margin: "2em 0", minHeight: "50vh"

}

const Blog: FC<any> = (): ReactElement => {
    const { state } = useStateContext()
    const navigate = useNavigate()
    const [posts, setPosts] = useState(Array<BlogPostProps>)

    const fetchPosts = async () => {
        const response = await axios.get(`${URL}${state.lang}/`);
        setPosts(response.data);
    };

    const openPost = (id: string) => {
        navigate(`${window.location.pathname}/${id}`)
    }

    useEffect(() => {
        fetchPosts()
    }, [state.lang, fetchPosts])
    return (
        <>
            <Box sx={boxPage}>
                <Box sx={gridBox}>
                    <Grid container alignContent="flex-end" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {posts.map((post, index) => (
                            <Grid item xs={6} key={post.id} onClick={() => { openPost(post.id) }}>
                                <PostDetailsCard post={post} isImageUp={index % 2 === 0} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box sx={feedbackBox}>
                <FeedbackBox />
            </Box>
        </>
    )
}

export default Blog