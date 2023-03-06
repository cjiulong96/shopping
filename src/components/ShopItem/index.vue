<template>
  <div class="shopItem flex-row">
    <div class="check_box">
      <van-checkbox
        v-model="shopItem.checked"
        checked-color="#FC4141"
        @click="$emit('do_checked', shopItem)"
      ></van-checkbox>
    </div>
    <div class="image flex-center">
      <img :src="shopItem.productInfo.image" alt="" />
    </div>
    <div class="shop_content">
      <div class="name text_hidden_1">
        {{ shopItem.productInfo.store_name }}
      </div>
      <div class="count">
        <div class="desc">
          <span class="name">属性：</span>
          <span>{{ "" || "默认" }}</span>
        </div>
        <div class="price flex-space">
          <span>￥{{ shopItem.truePrice }}</span>
          <div class="step"></div>
          <van-stepper v-model="shopItem.cart_num" integer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
