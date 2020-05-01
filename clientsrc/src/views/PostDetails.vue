
<template>
  <div class="postDetails mt-4 vh-100">
    <div class="postComp">
      <div class="card m-2">
        <img class="card-img-top" v-if="post.picture" :src="post.picture" />
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{post.title}}</strong>
          </h5>
          <hr />
          <p class="card-text">{{post.content}}</p>
        </div>
        <div class="card-footer">
          <!-- TODO insert progress bar -->
          <ResultsComp v-if="post.id" :postData='post' :key="post.id" />
        </div>
      </div>
    </div>
    <!-- TODO insert comments (sockets?)-->
    <!-- create comment comp -->
    <CreateCommentComp />
  </div>
</template>


<script>
import ResultsComp from "../components/ResultsComp";
import CommentComp from "../components/CommentComp";
import CreateCommentComp from "../components/CreateCommentComp";
export default {
  name: "postDetails",
  props: ["postData"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPost", this.$route.params.postId);
  },
  computed: {
    post() {
      return this.$store.state.activePost;
    }
  },
  methods: {},
  components: { CommentComp, CreateCommentComp, ResultsComp }
};
</script>


<style scoped>
</style>

