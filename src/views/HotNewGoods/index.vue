<template>
  <div class="hot_new_goods">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <van-image width="100%" height="140" fit="cover" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <div class="list">
      <GoodItem v-for="item in list" :key="item.id" :itemInfo="item"></GoodItem>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    GoodItem: () => import("@cmpt/GoodItem/index.vue"),
  },
  data() {
    return {
      list: [],
      banner: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let data = await this.$api({
        method: "GET",
        url: "/groom/list/1",
        data: {
          page: 1,
          limit: 10,
        },
      });
      this.banner = data.banner;
      this.list = data.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.hot_new_goods {
  background-color: #fff;
}
.list {
  padding: 0 16px;
}
</style>
