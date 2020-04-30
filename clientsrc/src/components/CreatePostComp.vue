<template>
  <div class="createPostComp">
    <div
      class="modal fade"
      id="orangeModalSubscription"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-notify modal-warning" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Header-->
          <div class="modal-header text-center">
            <h4 class="modal-title white-text w-100 font-weight-bold py-2">Create a Post</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>

          <!--Body-->
          <div class="modal-body">
            <div class="md-form mb-5">
              <i class="fas fa-user prefix grey-text"></i>
              <input type="text" id="form3" class="form-control" v-model="newPost.title" />
              <label data-error="wrong" data-success="right" for="form3">Title</label>
            </div>

            <div class="md-form">
              <i class="fas fa-envelope prefix grey-text"></i>
              <input type="text" id="form2" class="form-control" v-model="newPost.content" />
              <label data-error="wrong" data-success="right" for="form2">Content</label>
            </div>
          </div>

          <!--Footer-->
          <div class="modal-footer justify-content-center">
            <button
            
              type="button"
              class="btn btn-primary waves-effect ml-5"
              data-dismiss="modal"
              @click.prevent="addPost()"
            >Create</button>
          </div>
        </div>
        <!--/.Content-->
      </div>
    </div>

    <div class="text-center">
      <a
        href
        class="btn bg-warning btn-rounded"
        data-toggle="modal"
        data-target="#orangeModalSubscription"
      >&plus;</a>
    </div>
  </div>
</template>


<script>
export default {
  name: "createPostComp",
  props: ["createData"],
  data() {
    return {
      newPost: {}
    };
  },
  computed: {},

  methods: {
    addPost() {
      this.$store.dispatch("addPost", this.newPost);
      this.newPost = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>