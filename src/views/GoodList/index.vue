<template>
  <div id="goodList">
    <header class="flex-space">
      <div class="input flex-row">
        <van-icon name="search"></van-icon>
        <input
          v-model="ajaxData.keyword"
          type="text"
          placeholder="搜索"
          @input="throttle_search()"
        />
      </div>
      <div class="icon" @click="change_list_type">
        <van-icon :name="listType ? 'apps-o' : 'wap-nav'"></van-icon>
      </div>
    </header>
    <div class="sort flex-row">
      <div
        :class="[
          'item flex-center',
          { active: index === 0 || (index === 3 && ajaxData.news) },
        ]"
        v-for="(item, index) in sortList"
        :key="item.name"
        @click="sort_handle(index, item.type)"
      >
        <span>{{ item.name }}</span>
        <img v-if="item.type" :src="icon(item.type)" alt="" />
      </div>
    </div>
    <div class="good_list flex-space" :class="{ good_list_2: !listType }">
      <template v-if="listType">
        <GoodListItem
          v-for="goodListItem in goodList"
          :key="goodListItem.id"
          :goodListItem="goodListItem"
        >
        </GoodListItem>
      </template>
      <template v-else>
        <GoodItem
          v-for="goodListItem in goodList"
          :key="goodListItem.id"
          :itemInfo="goodListItem"
        ></GoodItem>
      </template>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/index.js";

export default {
  components: {
    GoodItem: () => import("@cmpt/GoodItem"),
    GoodListItem: () => import("@cmpt/GoodListItem"),
  },
  data() {
    return {
      query: this.$route.query,
      sortList: [
        {
          name: "价格",
          type: "priceOrder",
        },
        {
          name: "销量",
          type: "salesOrder",
        },
        {
          name: "新品",
          type: "",
        },
      ],
      goodList: [],
      listType: true,
      priceOrder: "",
      salesOrder: "",
      icons: {
        "": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC",
        asc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyRUYyOEEyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIyRUYyODkyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn93ow0AAAEASURBVHjaYnxprMyAA0gD8RwgTgLi59gUMOHQyA/E24HYA4h3QvlEaeYC4m1ArAvlg+gtUHG8mtmAeAUQW6GJ2wDxciBmxaWZEYjnAbEvDq/4AfF8qDoMzROAOJoBPwDJ96FrrgTiPAbiQAEQV4AYLECcCcRtDKQBkPqPLNCQVWYgHfxl2ZBW9pCBTACyWR6ImcmyGUh4AfE0MjRngUJ7OhDXkKgRFDvTYVHVCsSTidQ4EYg70BNJPhAvJaARJF+ILYX9h2a/zTg0bgLiRKg6rBnjFxBHAPFxNPGjQBwJxL8JZclvQOwJxJehfBDtDRUnqjD4CDVgBxC7Q/kYACDAAJfhLaK8zH0rAAAAAElFTkSuQmCC",
        desc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNkQ5Q0IyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNkQ5Q0EyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqHv5oAAAD/SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5mA8aWxsjyQZibXZi8gnkaG5ixQaE8H4hoSNYJiZzosqlqBeDKRGicCcQd6IskH4qUENILkC7GlsP/Q7LcZh8ZNQJwIVYc1Y/wC4gggPo4mfhSII4H4N6Es+Q2IPYH4MpQPor2h4kQVBh+hBuwAYncoHwMABBgABy8t3vXX4OYAAAAASUVORK5CYII=",
      },
      ajaxData: {
        page: 1,
        limit: 10,
        keyword: "",
        news: 0,
        priceOrder: "",
        salesOrder: "",
      },
      sortIconCount: 0,
      debounce_func: null,
    };
  },
  computed: {
    icon: (vm) => {
      return (type) => {
        let { icons } = vm;
        return icons[vm.ajaxData[type]];
      };
    },
  },
  created() {
    let kw = this.$route.query?.keyword;
    this.ajaxData.keyword = kw;

    this.debounce_func = debounce();
    this.set_sort_list();
    this.throttle_search();
  },
  methods: {
    //
    set_sort_list() {
      this.sortList.unshift({
        name: this.query.title || "默认",
        type: "",
      });
    },
    // 排序
    sort_handle(idx, type) {
      this.sortIconCount = this.sortIconCount < 2 ? this.sortIconCount + 1 : 0;
      let icon_keys = Object.keys(this.icons);
      if (type) {
        this.ajaxData[type] = icon_keys[this.sortIconCount];
      }
      switch (idx) {
        case 0:
          this.ajaxData.news = 0;
          break;
        case 1:
          this.ajaxData.salesOrder = "";
          break;
        case 2:
          this.ajaxData.priceOrder = "";
          break;
        case 3:
          this.ajaxData.news = this.ajaxData.news === 0 ? 1 : 0;
          break;
        default:
      }
      this.throttle_search();
    },
    // 展示切换
    change_list_type() {
      this.listType = !this.listType;
    },
    throttle_search() {
      this.debounce_func(this.get_good_list, 500, true);
    },
    // 列表
    async get_good_list() {
      const good_list = await this.$api({
        method: "GET",
        url: "/products",
        data: {
          ...this.ajaxData,
          sid: this.query.id,
        },
      });
      this.goodList = good_list;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
