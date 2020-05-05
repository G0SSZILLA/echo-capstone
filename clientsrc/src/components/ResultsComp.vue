<template>
  <div class="ResultsComp">
    <div class="mx-5">
    <div class="progress bg-warning" style="height:10px; border-radius: 1px;">
      <div
        class="progress-bar" style="height:10px; border-radius: 1px"
        role="progressbar"
        :style="resultsBar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
        </div>
<div class="mx-0">
    <div class="d-flex justify-content-between">
      <span style="position:relative; top:-17px">{{supportPercent}}%</span>
      <span style="position:relative; top:-17px">{{disregardPercent}}%</span>
      </div>
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
        this.supportPercent = Math.round((this.supportValue / this.sumValue) * 100)
        this.disregardPercent = Math.round((this.disregardValue / this.sumValue) * 100)
    }
  },
  components: {}
};
</script>


<style scoped>
</style>