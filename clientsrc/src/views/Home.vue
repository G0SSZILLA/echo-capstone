<template>
  <div class="home">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8"></div>
      <div class="col-2">
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