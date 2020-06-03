import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience, firebaseAuthConfigData } from "./authConfig";
import axios from "axios";
import firebase from 'firebase';


Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl ?
            appState.targetUrl :
            window.location.pathname
        );
    }
});

var firebaseConfig = firebaseAuthConfigData;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = new Vue({
    router,
    // @ts-ignore
    store,
    axios,
    render: function(h) {
        return h(App);
    }
})
store.$app = app
app.$mount("#app");