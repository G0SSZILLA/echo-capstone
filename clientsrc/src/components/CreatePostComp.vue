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
        <div class="modal-content m-auto">
          <!--Header-->
          <div class="modal-header text-center">
            <h4 class="modal-title white-text w-100 font-weight-bold py-2">Create a Post</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>

          <!--Body-->
          <div class="modal-body">
            <div class="md-form mb-4">
              <i class="grey-text"></i>
              <label data-error="wrong" data-success="right" for="form3">Title</label>
              <input type="text" id="form3" class="form-control" v-model="newPost.title" />
            </div>

            <div class="md-form">
              <label data-error="wrong" data-success="right" for="form2">Content</label>
              <textarea
                type="text"
                id="form2"
                class="form-control"
                rows="5"
                cols="20"
                v-model="newPost.content"
              />
            </div>

            <div class="md-form justify-content-center mt-4">
              <label data-error="wrong" class data-success="right" for="form4">Add Image</label>
              <input
                type="file"
                id="form4"
                class="form-control p-1"
                accept="image/*"
                @change="encodeImage"
              />
            </div>
            <div class="justify-content-center">
              <button
                v-show="!hideAddPost"
                type="button"
                class="btn btn-primary waves-effect my-3 shadow"
                data-dismiss="modal"
                @click.prevent="addPost()"
              >Post</button>
              <div v-show="hideAddPost" class="spinner-border mt-3" role="status" />
                <div v-show="hideAddPost">
            <p>Uploading Image...</p>
                </div>
                <!-- NOTE Currently no img preview on add Image -->
            <div class="modal-footer" id="imageUpload"></div>
          </div>
          </div>
          <!--Footer-->
        </div>
        <!--/.Content-->
      </div>
    </div>

    <div class="text-center">
      <a
        href
        class="btn bg-dark text-white shadow float-right mr-2 mt-3"
        data-toggle="modal"
        data-target="#orangeModalSubscription"
        style="border-radius: 50%; z-index:1"
      >&plus;</a>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  name: "createPostComp",
  props: ["createData"],
  data() {
    return {
      hideAddPost: false,
      newPost: {
        support: [],
        disregard: []
      }
    };
  },
  computed: {},

  methods: {
    async addPost() {
      this.newPost.support[0] = this.$auth.user.email;
      this.$store.dispatch("addPost", this.newPost);
      this.newPost = {};
      window.location.reload()
    },
    async encodeImage(event) {
      this.hideAddPost = true;
      let imageData = event.target.files[0];
      const storageRef = firebase
        .storage()
        .ref(`${imageData.name} - ${imageData.lastModified}`)
        .put(imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        error => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.newPost.picture = url;
            this.hideAddPost = false;
          });
        }
      );
      console.log("this is our event", event.target.files[0]);
    }
  },

  components: {}
};
</script>


<style scoped>
</style>