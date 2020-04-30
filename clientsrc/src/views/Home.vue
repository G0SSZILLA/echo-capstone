<template>
  <div class="home">
   <CreatePostComp v-if="$auth.isAuthenticated" />
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