<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6"></div>
      <div class="col-3">
   <CreatePostComp v-if="$auth.isAuthenticated" />
      </div>
    </div>
  </div>
</template>


<script>
import CreatePostComp from '../components/CreatePostComp.vue'
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {CreatePostComp, }
};
</script>


<style scoped>
</style>