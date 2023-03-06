<template>
  <div id="search">
    <header class="flex-space">
      <div @click="goBack">⬅</div>
      <div action="" class="flex-row input">
        <van-icon name="search"></van-icon>
        <input v-model="keyword" type="text" placeholder="搜索商品" />
      </div>
      <button @click="handle_search">搜索</button>
    </header>
    <div class="hot" v-if="hotData.length">
      <div class="text">热门搜索</div>
      <div class="text_list" @click="handle_search">
        <span v-for="item in hotData" :data-kw="item" :key="item">{{
          item
        }}</span>
      </div>
    </div>
    <div class="search_list" v-if="searchData.length">
      <div v-for="sItem in searchData" :key="sItem.id">
        <GoodItem :itemInfo="sItem"></GoodItem>
      </div>
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
      keyword: "",
      hotData: [],
      searchData: [],
    };
  },
  created() {
    this.get_hot_data();
  },
  methods: {
    async get_hot_data() {
      const hot_data = await this.$api({
        method: "GET",
        url: "/search/keyword",
      });
      this.hotData = hot_data;
    },
    async handle_search(e) {
      let kw = e.target?.dataset.kw || this.keyword;
      const search_data = await this.$api({
        method: "GET",
        url: `/products?page=1&limit=20&keyword=${kw}`,
      });
      this.searchData = search_data;
    },
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
