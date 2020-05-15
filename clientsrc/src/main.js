import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
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

var firebaseConfig = {
    apiKey: "AIzaSyDfKD0oQH_Cc7xDI0mozxqWsaEr4dAfsnY",
    authDomain: "echo-betasaur.firebaseapp.com",
    databaseURL: "https://echo-betasaur.firebaseio.com",
    projectId: "echo-betasaur",
    storageBucket: "echo-betasaur.appspot.com",
    messagingSenderId: "167131218300",
    appId: "1:167131218300:web:9934333ec3faccfc2f64f9"
  };
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