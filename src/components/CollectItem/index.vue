<template>
  <router-link tag="div" class="CollectItem" :to="`/detail/${collectItem.pid}`">
    <div class="wrapper flex-row">
      <div class="image">
        <img :src="collectItem.image" alt="" />
      </div>
      <div class="right flex-col">
        <div class="name van-ellipsis">{{ collectItem.store_name }}</div>
        <div class="price_box flex-space">
          <div class="price">￥{{ collectItem.price }}</div>
          <div class="del" @click.stop="$emit('do_del', collectItem.pid)">
            删除
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["collectItem"],
};
</script>

<style lang="scss" scoped>
.CollectItem {
  height: 90px;
  background-color: #fff;
  .wrapper {
    padding: 15px 15px 15px 0;
    margin-left: 15px;
    border-bottom: 1px solid #eee;
    height: 100%;
  }
  .image {
    width: 66px;
    height: 66px;
    margin-right: 10px;
  }
  .right {
    width: calc(100% - 66px - 10px);
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    color: #282828;
    font-size: 14px;
    .name {
      width: 100%;
    }
    .price_box {
      height: 24px;
      width: 100%;
    }
    .price {
      color: #fc4141;
    }
    .del {
      padding: 2px 12px;
      border: 1px solid #bbb;
    }
  }
}
</style>
