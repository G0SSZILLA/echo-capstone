<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6"></div>
      <div class="col-3">
   <CreatePostComp v-if="$auth.isAuthenticated" />
   <PostComp v-for='post in posts' :key='post.id' :postData='post'/>
  </div>
</template>


<script>
import PostComp from '../components/PostComp.vue'
import CreatePostComp from '../components/CreatePostComp.vue'
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('getPosts')
  },
  computed: {
    posts() {
      return this.$store.state.posts
    }
  },
  methods: {},
  components: {CreatePostComp, PostComp}
};
</script>


<style scoped>
</style>