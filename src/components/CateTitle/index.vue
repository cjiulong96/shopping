<template>
  <div class="cate_title flex-center">
    <div class="line"></div>
    <div class="title">{{ title }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.cate_title {
  .title {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin: 0 15px;
  }
  .line {
    width: 50px;
    height: 1px;
    background-color: #999;
  }
}
</style>
