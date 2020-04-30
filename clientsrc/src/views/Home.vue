<template>
  <div class="home">
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