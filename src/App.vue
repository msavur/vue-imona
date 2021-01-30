<template>
  <div id="app">
    <WizardForm></WizardForm>
  </div>
</template>

<script>
import WizardForm from "./components/WizardForm.vue";

export default {
  name: "App",
  components: {
    WizardForm
  }
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
