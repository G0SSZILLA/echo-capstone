<template>
  <div class="commentComp">
    <div class="row justify-content-center border-top py-2">
      <div class="col-10"></div>

      <div class="dropdown show">
        <button
          class="bg-transparent border-0"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item ml-2" href="#" @click="reportComment()">Report Comment</a>
          <button
            v-if="this.$auth.user.email == this.commentData.creatorEmail"
            class="btn text-danger btn-sm ml-3"
            style="font-size: 1.1rem"
            @click="deleteComment()"
          >Delete Comment</button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <h5>{{commentData.content}}</h5>
      <p style="font-size: 13px">- {{commentData.creator.name}}</p>
    </div>
  </div>
</template>


<script>
import { discordWebhook } from "../authConfig";

export default {
  name: "commentComp",
  props: ["commentData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    // TODO delete and edit?
    deleteComment() {
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
          Swal.fire("Deleted!", "Your Comment has been deleted.", "success");
          this.$store.dispatch("deleteComment", this.commentData);
        }
      });
    },
    reportComment() {
      var request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://discordapp.com/api/webhooks/" + discordWebhook
      );

      request.setRequestHeader("Content-type", "application/json");

      var params = {
        username: this.$auth.user.name,
        avatar_url: "",
        content:
          "User " +
          this.$auth.user.name +
          " reported comment " +
          this.commentData.id +
          " from user " +
          this.commentData.creator.name +
          ' for the content "' +
          this.commentData.content +
          '".'
      };

      request.send(JSON.stringify(params));
    }
  },
  components: {}
};
</script>


<style scoped>
</style>