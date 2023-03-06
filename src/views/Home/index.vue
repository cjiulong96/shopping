<template>
  <div id="home">
    <!-- 头部 ```S -->
    <header>
      <div class="header flex-center">
        <van-row class="flex-center">
          <van-col span="6">
            <div class="logo">
              <img :src="logoUrl" alt="img" />
            </div>
          </van-col>
          <van-col span="18">
            <router-link to="/search" class="search flex-row">
              <!-- <span class="iconfont icon-search-2"></span> -->
              <van-icon name="search" class="icon-search" />
              搜索商品
            </router-link>
          </van-col>
        </van-row>
      </div>
    </header>
    <!-- 头部 ```E -->
    <!-- 轮播图 ```S -->
    <div class="banner" @click="click_banner_image">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="image in banner" :key="image.id">
          <img :src="image?.pic" :data-url="image.wap_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图 ```E -->
    <!-- 分类菜单 ```S -->
    <div class="menus flex-center">
      <router-link
        class="item flex-center flex-col"
        :to="menu?.wap_url"
        v-for="menu in menus"
        :key="menu?.id"
      >
        <img :src="menu?.pic" alt="img" />
        <span>{{ menu?.name }}</span>
      </router-link>
    </div>
    <!-- 分类菜单 ```E -->
    <!-- 新闻 ```S -->
    <div class="news flex-row">
      <div class="picture">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
          alt="img"
        />
      </div>
      <van-swipe :autoplay="5000" vertical :show-indicators="false">
        <van-swipe-item v-for="news in roll" :key="news?.id">
          <router-link :to="news?.wap_url" class="item">
            <div class="flex-space">
              <div class="text">
                {{ news?.info }}
              </div>
              <!-- <span class="iconfont icon-next"></span> -->
              <van-icon name="arrow" class="icon-next"></van-icon>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 新闻 ```E -->
    <!-- 快速选择 ```S -->
    <div class="quickSelection">
      <div class="title flex-space">
        <div class="text">快速选择</div>
        <router-link to="/category" class="more">
          更多
          <!-- <span class="iconfont icon-next"></span> -->
          <van-icon name="arrow" class="icon-next"></van-icon>
        </router-link>
      </div>
      <div class="scroll-product">
        <van-swipe :loop="false" :show-indicators="false" class="flex-row">
          <van-swipe-item
            v-for="fast in fastList"
            :key="fast.id"
            class="flex-col item"
          >
            <router-link
              :to="`/goods_list?id=${fast.id}&title=${fast.cate_name}`"
            >
              <div class="picture">
                <img :src="fast.pic" alt="img" />
              </div>
              <div class="text">{{ fast.cate_name }}</div>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 快速选择 ```E -->
    <!-- 精品推荐 ```S -->
    <div class="recommend">
      <div class="title flex-space">
        <div class="text">精品推荐</div>
        <router-link to="/hot_new_goods/1" class="more">
          更多
          <!-- <span class="iconfont icon-next"></span> -->
          <van-icon name="arrow" class="icon-next"></van-icon>
        </router-link>
      </div>
      <div class="scroll-product">
        <van-swipe class="flex-row box" :autoplay="5000">
          <van-swipe-item
            v-for="bast in bastBanner"
            :key="bast.id"
            class="flex-col item"
          >
            <router-link :to="bast.wap_link">
              <div class="picture">
                <img :src="bast.img" alt="img" />
              </div>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 精品推荐 ```E -->
    <!-- 商品列表 ```S -->
    <div class="goodList flex-col">
      <GoodItem
        v-for="itemInfo in bastList"
        :key="itemInfo.id"
        :itemInfo="itemInfo"
      ></GoodItem>
    </div>
    <!-- 商品列表 ```E -->
  </div>
</template>
<script>
import Api from "@/api/index";
export default {
  name: "Home",
  components: {
    GoodItem: () => import("@cmpt/GoodItem"),
  },
  data() {
    return {
      logoUrl: null, // logo
      banner: [], //轮播图
      menus: [], //菜单
      roll: [], //新闻
      fastList: [], //快速选择
      bastBanner: [], //精品推荐
      bastList: [], //商品列表
    };
  },
  created() {
    this.get_home_data();
  },
  methods: {
    // 首页数据
    async get_home_data() {
      const homeData = await this.$api({
        method: "GET",
        url: Api.index,
      });
      let {
        logoUrl,
        banner,
        menus,
        roll,
        info: { fastList, bastBanner, bastList },
      } = homeData;
      this.set_data(
        { logoUrl },
        { banner },
        { menus },
        { roll },
        { fastList },
        { bastBanner },
        { bastList }
      );
    },
    set_data(...args) {
      for (let item of args) {
        this[Object.keys(item)[0]] = Object.values(item)[0];
      }
    },
    // 点击轮播图
    click_banner_image(e) {
      let ev = e || window.event;
      let { url } = ev.target.dataset;
      if (url) {
        window.location.href = url;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
