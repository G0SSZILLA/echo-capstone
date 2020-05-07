<template>
  <div class="noRoute container-fluid vh-100 bgImage">
    <div class="row" style="height:6rem"></div>
    <div class="row">
      <div class="col-12 mt-3">
        <h2 class="lost w-50 m-auto py-1">
          oops!
          <br />
          <strong>betasaur is lost</strong>
        </h2>
        <div>
          <img
            @click="routeHome()"
            src="../assets/img/GreenBetasaur.png"
            alt="Betaaa!"
            class="h-75 w-75"
          />
        </div>
        <h4 class="fixed-bottom">
          <strong>Requested page was not found...</strong>
          <br />
          <span class="text-danger">404</span>
        </h4>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "noRoute",
  data() {
    return {};
  },
  computed: {},
  methods: {
    routeHome() {
      this.$router.push({ name: "home" });
    }
  },
  components: {}
};
</script>

<style scoped>
.lost {
  color: white;
  border: 3px groove white;
  box-shadow: 2px 1px 10px 2px;
}
.bgImage {
  background-image: url("../assets/img/errorBackground.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>