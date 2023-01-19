// pages
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'

// other
import { FC } from 'react'

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>,
    visibility: boolean,
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'navbar.linkHome',
        path: '/',
        enabled: true,
        component: Home,
        visibility: true,
    },
    {
        key: 'blog-route',
        title: 'navbar.linkBlog',
        path: '/blog',
        enabled: true,
        component: Blog,
        visibility: true,
    },
    {
        key: 'post-route',
        title: 'Post',
        path: '/blog/:id',
        enabled: false,
        component: Post,
        visibility: false,
    },
]