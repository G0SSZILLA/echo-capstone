<template>
  <div class="home container-fluid mt-5">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6"></div>
      <div class="col-3">
        <CreatePostComp v-if="$auth.isAuthenticated" />
      </div>
    </div>
    <PostComp v-for="post in posts" :key="post.id" :postData="post" />
  </div>
</template>


<script>
import PostComp from "../components/PostComp.vue";
import CreatePostComp from "../components/CreatePostComp.vue";
export default {
  name: "home",
  data() {
    return {
      newest: true
    };
  },
  created() {
    this.$store.dispatch("getPosts");
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
  methods: {},
  components: { CreatePostComp, PostComp }
};
</script>


<style scoped>
</style>