<template>
  <div class="ResultsComp">
    <div class="progress bg-info">
      <div
        class="progress-bar"
        role="progressbar"
        :style="resultsBar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div class="d-flex justify-content-between">
      <span class="float-left">{{supportPercent}}%</span>
      <span class="float-right">{{disregardPercent}}%</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "ResultsComp",
  data() {
    return {
      sumValue: 0,
      supportValue: 0,
      disregardValue: 0,
      resultsBar: "",
      supportPercent: "",
      disregardPercent: ""
    };
  },
  props: ["postData"],
  mounted() {
    this.calculatePercent();
  },
  computed: {},
  methods: {
    calculatePercent() {
        this.supportValue = this.postData.support.length;
        this.disregardValue = this.postData.disregard.length;
        this.sumValue = this.supportValue + this.disregardValue;
        this.resultsBar =
          "width:" + (this.supportValue / this.sumValue) * 100 + "%";
        this.supportPercent = (this.supportValue / this.sumValue) * 100;
        this.disregardPercent = (this.disregardValue / this.sumValue) * 100;
    }
  },
  components: {}
};
</script>


<style scoped>
</style>