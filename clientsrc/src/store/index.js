import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost") ?
    "//localhost:3000/" :
    "/";

let api = Axios.create({
    baseURL: base + "api/",
    timeout: 10000,
    withCredentials: true,
});

export default new Vuex.Store({
    state: {
        user: {},
        post: {},
        activePost: {},
        posts: [],

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setPost(state, post) {
            state.post = post;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setActivePost(state, post) {
            state.activePost = post;
        },
    },
    actions: {
        //#region -- AUTH STUFF --
        setBearer({ }, bearer) {
            api.defaults.headers.authorization = bearer;
        },
        resetBearer() {
            api.defaults.headers.authorization = "";
        },
        async getProfile({ commit }) {
            try {
                let res = await api.get("profile");
                commit("setUser", res.data);
            } catch (err) {
                console.error(err);
            }
        },

        async addUserInput({ commit, dispatch }, postData) {
            try {
                let res = await api.put('posts/' + postData.id, postData)
            } catch (err) {
                console.error(err)
            }
        },
        //#endregion

        //#region -- POSTS --

        async getPosts({ commit, dispatch }) {
            try {
                let res = await api.get("posts");
                console.log("from get posts in store", res);
                commit("setPosts", res.data);
            } catch (error) {
                console.error(error, "failed to get posts from get posts in store");
            }
        },

        async getPost({ commit, dispatch }, postId) {
            try {
                let res = await api.get(`posts/${postId}`)
                commit("setActivePost", res.data);
            } catch (error) {
                console.error(error);
            }
        },

        async addPost({ commit, dispatch }, postData) {
            try {
                let res = await api.post("posts", postData);
                console.log("addPost from store", postData);
                // NOTE do we want this to push us to the post details page
                dispatch("getPosts");
            } catch (error) {
                console.error(error, "addPost in store failing");
            }
        },

        //#endregion

        //#region -- COMMENTS  --

        //#endregion

        //#region -- WHATEVS 4 NOW--
        //#endregion
    },
});