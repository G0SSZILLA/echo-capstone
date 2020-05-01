<template>
  <div class="postComp">
    <div class="card m-2">
      <img class="card-img-top" v-if="postData.picture" :src="postData.picture" />
      <div class="card-body">
        <h5 class="card-title">{{postData.title}}</h5>
        <p v-show="displayContent" class="card-text">{{postData.content}}</p>
        <div class="card-footer">
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
          <!-- <Results v-show="!showButton" :postData="postData" /> -->
          <p @click="goToDetails()" v-show="!showButton">Join the Conversation</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
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
  computed: {},
  methods: {
    async chooseSupport() {
      if (!this.$auth.isAuthenticated) {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      } else {
        this.showButton = false;
        this.postData.support.push(this.$auth.user.email);
        this.$store.dispatch("addUserInput", this.postData);
      }
    },

    async chooseDisregard() {
      if (!this.$auth.isAuthenticated) {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      } else {
        this.showButton = false;
        this.postData.disregard.push(this.$auth.user.email);
        this.$store.dispatch("addUserInput", this.postData);
      }
    },
    goToDetails() {
      console.log("goToDetails");
    }
  },

  goToDetails() {
    this.$router.push("posts/" + this.postData.id);
  },

  components: {}
};
</script>


<style scoped>
</style>