<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep_alive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep_alive"></router-view>
    <Tabbar v-if="$route.meta.show_tab_bar" />
  </div>
</template>

<script>
import Tabbar from "@cmpt/TabBar";
export default {
  name: "App",
  components: {
    Tabbar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #f5f5f5;
}
</style>
