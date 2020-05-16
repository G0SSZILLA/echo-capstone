<template>
  <div class="createCommentComp form">
    <footer class="createCommentFooter fixed-bottom">
      <div class="row p-1">
        <div class="col-3">
          <button class="btn bg-light btnMargin shadow" @click="backToHome()">Back</button>
        </div>
        <div class="col-6 p-0">
          <div class="md-form pink-textarea active-pink-textarea-2">
            <textarea
              id="form17"
              class="md-textarea form-control"
              v-model="newComment.content"
              placeholder="Comment here..."
              rows="2"
              @keyup.enter="addComment()"
            ></textarea>
          </div>
        </div>
        <div class="col-3">
          <button type="submit" @click="addComment" class="btn bg-light shadow btnMargin ">Send</button>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  name: "createCommentComp",
  data() {
    return {
      newComment: {}
    };
  },
  computed: {
    activePost() {
      return this.$store.state.activePost;
    }
  },
  methods: {
    addComment() {
      if (this.activePost.support.find(i => i == this.$auth.userInfo.email)) {
        this.newComment.support = true;
      } else {
        this.newComment.support = false;
      }

      this.newComment.postId = this.activePost.id;
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
    },
    backToHome() {
      this.$router.push({ name: "home" });
    }
  },
  components: {}
};
</script>


<style scoped>
.createCommentFooter{
  background-color: #314448c7;
}
.btnMargin {
  margin-top: .7rem;
}
textarea{
  outline: none;
  resize: none;
}
</style>