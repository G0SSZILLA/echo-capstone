
<template>
  <div class="postDetails mt-5 vh-100">
    <div class="postComp">
      <div class="card m-2">
        <div class="card-header text-right rounded">
          <button
            v-if="this.$auth.user.email == this.post.creatorEmail"
            class="btn text-danger btn-sm p-0"
            style="font-size: 1.5rem"
            @click="deletePost()"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete This Post"
          >&times;</button>
        </div>
        <img class="card-img-top shadow" v-if="post.picture" :src="post.picture" />
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
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPost", this.$route.params.postId);
    this.$store.dispatch("getComments", this.$route.params.postId);
    
  },
  computed: {
    comments() {
      if (
        this.post &&
        this.post.support &&
        this.post.support.find(i => i == this.$auth.user.email)
      ) {
        return this.$store.state.comments.filter(i => i.support == true);
      } else {
        return this.$store.state.comments.filter(i => i.support == false);
      }
    },
    post() {
      return this.$store.state.activePost;
    }
  },
  methods: {
    deletePost() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your Post has been deleted.", "success");
          this.$store.dispatch("deletePost", this.$route.params.postId);
          this.$router.push({ name: "home" });
        }
      });
    },
    
  },
  components: { CommentComp, CreateCommentComp, ResultsComp }
};
</script>


<style scoped>
</style>

