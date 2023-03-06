<template>
  <div id="category">
    <header class="flex-row">
      <form class="flex-row" onsubmit="return false">
        <van-icon name="search"></van-icon>
        <input
          v-model="kw"
          type="text"
          placeholder="搜索商品信息"
          @keyup.enter="debounce_func(to_search, 500)"
        />
      </form>
    </header>
    <div style="height: 48px"></div>
    <aside @click="change_active">
      <a
        :class="['item flex-center', { active: active_index === index }]"
        v-for="(aside, index) in category_data"
        :key="aside.id"
        :data-index="index"
        :href="`#right_item_${index}`"
      >
        {{ aside.cate_name }}
      </a>
    </aside>
    <div class="content" ref="scroll">
      <div
        :id="`right_item_${index}`"
        class="right_item"
        v-for="(parent, index) in category_data"
        :key="parent.id"
      >
        <CateTitle
          ref="cate_title"
          class="cate_t"
          :title="parent.cate_name"
        ></CateTitle>
        <div class="child flex-around">
          <div class="item" v-for="child in parent.children" :key="child.id">
            <router-link
              :to="`/goods_list?id=${child.id}&title=${child.cate_name}`"
            >
              <CateItem :cate_item="child"></CateItem>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index";
import { debounce } from "@/utils/index.js";
export default {
  name: "Category",
  components: {
    CateTitle: () => import("@cmpt/CateTitle/index.vue"),
    CateItem: () => import("@cmpt/CateItem/index.vue"),
  },
  data() {
    return {
      kw: "",
      active_index: 0,
      category_data: [],
      activeStep: 0,
      debounce_func: null,
    };
  },
  created() {
    this.get_category_data();
    this.debounce_func = debounce();
  },
  mounted() {
    // document.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    to_search() {
      this.$router.push({
        path: "/goods_list",
        query: {
          keyword: this.kw,
        },
      });
    },
    async get_category_data() {
      const category_data = await this.$api({
        url: Api.category,
        method: "GET",
      });
      this.category_data = category_data;
    },
    change_active(e) {
      let ev = e || window.event;
      let { index } = ev.target.dataset;
      index = Number(index);
      this.active_index = index;
      // var items = document.querySelectorAll(".right_item");
      // for (var i = 0; i < items.length; i++) {
      //   if (index === i) {
      //     items[i].scrollIntoView({
      //       block: "start", //默认跳转到顶部
      //       behavior: "smooth", //滚动的速度
      //     });
      //   }
      // }
    },
    // onScroll(e) {
    //   console.log(e);
    //   let scrollItems = document.querySelectorAll(".right_item");
    //   for (let i = scrollItems.length - 1; i >= 0; i--) {
    //     // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    //     let judge =
    //       e.target.scrollTop >
    //       scrollItems[i].offsetTop - scrollItems[0].offsetTop;
    //     console.log(
    //       e.target.scrollTop,
    //       scrollItems[i].offsetTop,
    //       scrollItems[0].offsetTop
    //     );
    //     if (judge) {
    //       this.active_index = i;
    //       break;
    //     }
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
