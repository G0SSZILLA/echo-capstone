<template>
  <div class="home container-fluid mt-5" ref="scrollArea">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6"></div>
      <div class="col-3">
        <CreatePostComp v-if="$auth.isAuthenticated" />
      </div>
    </div>
    <PostComp v-for="post in posts" :key="post.id" :postData="post" />
    <div ref="bottomTrigger" class="col-12">
      <div class="spinner-grow spinner-grow-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow spinner-grow-sm" role="status"></div>
      <div class="spinner-grow spinner-grow-sm" role="status"></div>
    </div>
  </div>
</template>


<script>
import PostComp from "../components/PostComp.vue";
import CreatePostComp from "../components/CreatePostComp.vue";
export default {
  name: "home",
  data() {
    return {
      newest: true,
      showLoading: true,
      lastLoaded: false
    };
  },

  mounted() {
    let observer = new IntersectionObserver(this.loadNextPosts, {
      rootMargin: "500px",
      threshold: 0
    });
    observer.observe(this.$refs.bottomTrigger);
  },
  computed: {
    posts() {
      if (this.newest) {
        return this.$store.state.posts.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      }
    },
    loadingPosts() {
      return this.$store.state.loadingPosts;
    }
  },
  methods: {
    async loadNextPosts() {
      if (this.loadingPosts == false && this.lastLoaded == false) {
        this.$store.commit("setLoadingPosts", true);
        let res = await this.$store.dispatch("getPosts", this.posts.length);
        if (res.data.length == 0) {
          this.lastLoaded = true;
        }
        console.log("Near the bottom???");
      }
    }
    // hideDots() {
    //   console.log("called from hideDots");
    //   showLoading = false;
    // }
  },
  components: { CreatePostComp, PostComp }
};
</script>


<style scoped>
.bottom-trigger {
  width: 90vw;
  height: 30px;
  /* TODO remove background color */
  /* background: red; */
}
</style>