<template>
  <div class="cate_item flex-col">
    <img :src="cate_item?.pic" alt="img" />
    <span class="text_hidden_1">{{ cate_item?.cate_name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cate_item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.cate_item {
  img {
    width: 60px;
    height: 60px;
  }
  span {
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    width: 60px;
    color: #333;
  }
}
</style>
