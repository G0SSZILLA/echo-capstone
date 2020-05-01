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

import { authGuard } from "@bcwdev/auth0-vue"

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
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
            path: "*",
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    // @ts-ignore
    if (to.name != "home" && router.app.$auth.user.email_verified == false) {
        next({ name: "home" })
    }
    next()
})

export default router