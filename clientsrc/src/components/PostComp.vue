<template>
  <div class="postComp">
    <div class="card m-2">
      <img class="card-img-top" v-if="postData.picture" :src="postData.picture" />
      <div class="card-body pb-2">
        <h5 class="card-title">{{postData.title}}</h5>
        <p v-show="displayContent" class="card-text">{{postData.content}}</p>
        <div class="card-footer px-2 pb-0 pt-3 bg-white" v-if="$auth.isAuthenticated">
          <div v-if="$auth.user.email_verified">
            <a
              href="#"
              class="btn btn-primary"
              v-show="showButton"
              @click.prevent="chooseSupport()"
            >support</a>
            <a
              href="#"
              class="btn btn-primary"
              v-show="showButton"
              @click.prevent="chooseDisregard()"
            >disregard</a>
            <ResultsComp v-if="!showButton" :postData="postData" />
            <p class='mb-0 pb-0' @click="goToDetails()" v-show="!showButton">Join the Conversation</p>
          </div>
          <small v-else>User email is not verified.</small>
        </div>
        <div v-else>
          <button class="btn btn-dark" @click="logInUser()">Log in to vote</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getInstance } from "@bcwdev/auth0-vue";
import ResultsComp from '../components/ResultsComp.vue'
export default {
  name: "postComp",
  props: ["postData"],
  data() {
    return {
      displayContent: false,
      showButton: true
    };
  },
  created() {
    this.newMethod();
  },
  watch: {
    user: function(newVal, oldVal) {
      this.newMethod();
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    chooseSupport() {
      this.showButton = false;
      this.postData.support.push(this.$auth.user.email);
      this.$store.dispatch("addUserInput", this.postData);

    },

    chooseDisregard() {
      this.showButton = false;
      this.postData.disregard.push(this.$auth.user.email);
      this.$store.dispatch("addUserInput", this.postData);
    },
    async logInUser() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$store.dispatch("getPosts");
    },

    goToDetails() {
      this.$store.commit("setActivePost", {})
      this.$router.push({
        name: "postDetails",
        params: {postId: this.postData.id}
      })
    },

    newMethod() {
      if (this.$auth.isAuthenticated) {
        let i = this.postData.support.find(
          element => element == this.$auth.user.email
        );
        if (i) {
          this.showButton = false;
        }
      }
      if (this.$auth.isAuthenticated) {
        let j = this.postData.disregard.find(
          element => element == this.$auth.user.email
        );
        if (j) {
          this.showButton = false;
        }
      }
    }
  },

  components: {
      ResultsComp
  }
};
</script>


<style scoped>
</style>