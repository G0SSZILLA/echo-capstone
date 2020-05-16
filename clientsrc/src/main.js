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
    apiKey: "AIzaSyC6caBv_PUysA60Ej569_gGA88ONbsdtXA",
    authDomain: "betasaur-echo-1.firebaseapp.com",
    databaseURL: "https://betasaur-echo-1.firebaseio.com",
    projectId: "betasaur-echo-1",
    storageBucket: "betasaur-echo-1.appspot.com",
    messagingSenderId: "992394261094",
    appId: "1:992394261094:web:e2f324aeb0a37753f8b3a7"
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