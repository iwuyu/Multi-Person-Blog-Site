<template>
  <div id="profile">
    <!-- <app-header/> -->
    <login/>
  </div>
</template>

<script>
import appHeader from "components/content/header/appHeader";
import login from "./childConps/login";
export default {
  name:"profile",
  components: {
    appHeader,
    login
  }

}
</script>

<style lang="scss" scoped>

</style>