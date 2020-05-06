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
    <div ref="bottomTrigger" class="bottom-trigger"></div>
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
    };
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  mounted() {
    let observer = new IntersectionObserver(this.loadNextPosts, {
      // root: document.body
      // rootMargin: "50px",
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
    }
  },
  methods: {
    async loadNextPosts() {
      try{
       let res = await this.$axios.get('api/posts?skip='+ this.$store.state.posts.length)
       console.log(res);
       
      //  this.$store.commit("addPosts", res)
        this.posts.push(...res)
      }catch(e){

      }

      console.log("Near the bottom???", arguments);
    }
  },
  components: { CreatePostComp, PostComp }
};
</script>


<style scoped>
.bottom-trigger {
  width: 10vw;
  height: 30px;
  background: red;
}
</style>