<template>
  <div id="app">
    <StepFormValidation></StepFormValidation>
  </div>
</template>

<script>
import StepFormValidation from "./components/StepFormValidation.vue";

export default {
  name: "App",
  components: {
    StepFormValidation
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
