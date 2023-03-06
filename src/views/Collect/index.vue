<template>
  <div id="Collect" v-if="collectList.length">
    <CollectItem
      v-for="item in collectList"
      :key="item.pid"
      :collectItem="item"
      @do_del="del_collect"
    ></CollectItem>
  </div>
</template>

<script>
import CollectItem from "@cmpt/CollectItem";
import { Toast } from "vant/lib";
export default {
  components: {
    CollectItem,
  },
  data() {
    return {
      collectList: [],
    };
  },
  created() {
    this.geet_collect_list();
  },
  methods: {
    async geet_collect_list() {
      let collect_list = await this.$api({
        method: "GET",
        url: "/collect/user",
        data: {
          page: 1,
          limit: 20,
        },
      });
      this.collectList = collect_list;
    },
    del_collect(id) {
      this.$api({
        method: "POST",
        url: "/collect/del",
        data: {
          category: "product",
          id,
        },
      }).then(() => {
        Toast.success("删除成功");
        this.geet_collect_list();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
