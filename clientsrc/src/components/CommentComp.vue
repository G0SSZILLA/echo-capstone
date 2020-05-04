<template>
  <div class="commentComp">
    <div class="row justify-content-center border-top border-bottom py-2">
        <div class="col-10"></div>
        <div class="col-2 p-0">
        <button
          v-if="this.$auth.user.email == this.commentData.creatorEmail"
          class="btn text-danger btn-sm p-0"
          style="font-size: 1.5rem"
          @click="deleteComment()"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete This Comment"
        >&times;</button>
        </div>
      <div class="col-12">
        <h5>{{commentData.content}}</h5>
        <p style="font-size: 13px">- {{commentData.creator.name}}</p>
      </div>
    </div>
  </div>
</template>


<script>
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
    }
  },
  components: {}
};
</script>


<style scoped>
</style>