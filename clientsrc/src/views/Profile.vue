<template>
  <div class="profile pt-3 mt-5">
<p>My Profile</p>
<div>{{this.user.name}} </div>
<div>{{this.user.email}}</div>
  </div>
</template>


<script>
export default {
  name: 'profile',
  data(){
    return {}
  },
  computed:{
    user() {
    return this.$store.state.user
  },
  },
  mounted() {
    this.$store.dispatch("getProfile")
  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>