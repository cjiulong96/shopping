<template>
  <router-link class="ExcellentItem" :to="`/detail/${excellentItem.id}`">
    <div class="image">
      <img :src="excellentItem.image" alt="" />
    </div>
    <div class="name text_hidden_1">{{ excellentItem.store_name }}</div>
    <div class="price">￥{{ excellentItem.price }}</div>
  </router-link>
</template>

<script>
export default {
  props: ["excellentItem"],
};
</script>

<style lang="scss" scoped>
.ExcellentItem {
  .image {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 6px;
    overflow: hidden;
  }
  .name {
    width: 100%;
    font-size: 14px;
    color: rgb(40, 40, 40);
    margin-top: 6px;
    font-weight: 700;
    text-align: left;
  }
  .price {
    font-size: 14px;
    color: rgb(252, 65, 65);
    text-align: left;
    font-weight: 700;
  }
}
</style>
