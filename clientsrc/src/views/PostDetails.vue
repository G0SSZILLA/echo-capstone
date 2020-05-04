
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
          <ResultsComp v-if="post.id" :postData="post" :key="post.id" />
        </div>
      </div>
    </div>
    <!-- insert comments (sockets?)-->
    <div class="card m-1">
      <div class="card-title border-bottom mt-3 mx-3 justify-content-center">
        <h2>Comment Chamber</h2>
      </div>
      <div class="card-body mb-5">
        <commentComp v-for="comment in comments" :commentData="comment" :key="comment.id" />
      </div>
    </div>
    <div>
      <!-- create comment comp sticky footerbar -->
      <CreateCommentComp />
    </div>
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
    this.$store.dispatch("getComments", this.$route.params.postId);
    // dispatch join the room ????
  },
  computed: {
    comments() {
      if (
        this.post &&
        this.post.support &&
        this.post.support.find(i => i == this.$auth.user.email)
      ) {
        return this.$store.state.comments.filter(i => i.support == true);
        this.$store.dispatch(
          "JoinRoom",
          this.$route.params.postId + ":support"
        );
      } else {
        return this.$store.state.comments.filter(i => i.support == false);
        this.$store.dispatch(
          "JoinRoom",
          this.$route.params.postId + ":disregard"
        );
      }
    },
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

