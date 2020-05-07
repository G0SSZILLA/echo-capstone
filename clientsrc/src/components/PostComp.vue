<template>
  <div class="postComp">
    <div class="card shadow my-2 mx-0">
      <div class="row">
        <div class="col-6">
          <!-- <p class="ml-2 text-left">{{postData.creatorEmail}}</p> -->
        </div>
        <div class="col-6">
          <!-- <p class="mr-2 text-right">{{date()}}</p> -->
        </div>
      </div>
      <img class="card-img-top" v-if="postData.picture" :src="postData.picture" />
      <div class="card-body pb-2">
        <h4 class="card-title">{{postData.title}}</h4>
        <p
          @click="seeMoreContent()"
          v-show="displayContent"
          :class="{'overflow-hidden': !showMore, 'heightSomething': !showMore, 'card-text': displayContent}"
        >{{postData.content}}</p>
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
            <p class="mb-0 pb-0" @click="goToDetails()" v-show="!showButton">Join the Conversation</p>
          </div>
          <small v-else>User email is not verified.</small>
        </div>
        <div v-else>
          <button class="btn btn-dark" @click="logInUser()">Log in to vote</button>
        </div>
        <div v-if="postData.id == '5eb44a4e8d282358341e8b47'" ref="theLastPost" />
      </div>
    </div>
  </div>
</template>


<script>
import { getInstance } from "@bcwdev/auth0-vue";
import ResultsComp from "../components/ResultsComp.vue";
export default {
  name: "postComp",
  props: ["postData"],
  data() {
    return {
      displayContent: true,
      showMore: false,
      showButton: true,
      chooseVote: {}
    };
  },
  mounted() {
    if (this.postData.id == "5eb44a4e8d282358341e8b47") {
      let observer = new IntersectionObserver(this.hideLoading);
      observer.observe(this.$refs.theLastPost);
    }
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
    },
    choice() {}
  },
  methods: {
    chooseSupport() {
      this.postData.support.push(this.$auth.user.email);
      // this.$store.dispatch("addUserInput", this.postData);
      this.chooseVote.choice = true;
      this.chooseVote.title = this.postData.title;
      this.chooseVote.id = this.postData.id;
      this.$store.dispatch("addUserInput", this.chooseVote);
      this.showButton = false;
    },

    seeMoreContent() {
      this.showMore = !this.showMore;
    },

    chooseDisregard() {
      this.postData.disregard.push(this.$auth.user.email);
      // this.$store.dispatch("addUserInput", this.postData);
      this.chooseVote.choice = false;
      this.chooseVote.title = this.postData.title;
      this.chooseVote.id = this.postData.id;
      this.$store.dispatch("addUserInput", this.chooseVote);
      this.showButton = false;
    },
    async logInUser() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$store.dispatch("getPosts");
    },

    goToDetails() {
      this.$store.commit("setActivePost", {});
      this.$router.push({
        name: "postDetails",
        params: { postId: this.postData.id }
      });
    },

    showResults() {
      this.showButton = false;
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
    },

    date() {
      let date = this.postData.updatedAt.split("T");
      return date[0];
    },
    hideLoading() {
      this.$emit("reached-last-post");
      console.log("called from hideLoading");
    }
  },

  components: {
    ResultsComp
  }
};
</script>


<style scoped>
.heightSomething {
  max-height: 4.5rem;
}
</style>