import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from '../views/Home.vue'
// @ts-ignore
import Profile from '../views/Profile.vue'
// @ts-ignore
import PostDetails from '../views/PostDetails.vue'
// @ts-ignore
import About from '../views/About.vue'
// @ts-ignore
import Signup from '../views/Signup.vue'

import { authGuard } from "@bcwdev/auth0-vue"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            beforeEnter: authGuard
        },
        {
            path: '/posts/:postId',
            name: 'postDetails',
            component: PostDetails,
            beforeEnter: authGuard
        },

        {
            path: '/about',
            name: 'about',
            component: About
        },

        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },

        {
            path: "*",
            redirect: '/'
        }
    ]
})