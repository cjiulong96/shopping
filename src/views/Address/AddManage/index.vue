<template>
  <div class="add_manage">
    <div class="line">
      <img src="http://47.115.51.185/h5/img/line.05bf1c84.jpg" alt="" />
    </div>
    <div class="address_list">
      <AddressItem
        v-for="item in addressList"
        :key="item.id"
        :addressItem="item"
        @do_checked="do_checked"
        @do_del="do_del"
        @do_edit="do_edit"
      ></AddressItem>
    </div>
    <footer class="footer flex-center">
      <div @click="$router.push('/user/add_address')" class="add flex-center">
        <van-icon name="location-o"></van-icon>
        <span class="text">添加新地址</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { Toast } from "vant/lib";

export default {
  components: {
    AddressItem: () => import("@cmpt/AddressItem/index.vue"),
  },
  data() {
    return {
      addressList: [],
    };
  },
  created() {
    this.get_address_list();
  },
  methods: {
    async get_address_list() {
      let address_list = await this.$api({
        method: "GET",
        url: "/address/list",
        data: {
          page: 1,
          limit: 30,
        },
      });
      this.addressList = address_list;
    },
    do_checked(item) {
      this.addressList = this.addressList.map((a) => {
        a.is_default = a.id === item.id ? true : false;
        return a;
      });
      this.$api({
        method: "post",
        url: "/address/default/set",
        data: {
          id: item.id,
        },
      });
    },
    do_edit(id) {
      this.$router.push({
        path: "/user/add_address/" + id,
      });
    },
    do_del(id) {
      this.$api({
        method: "POST",
        url: "/address/del",
        data: {
          id,
        },
      }).then(() => {
        Toast("删除成功");
        this.get_address_list();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add_manage {
  background-color: #f5f5f5;
  padding-bottom: 60px;
  .line {
    width: 100%;
  }
  .footer {
    position: fixed;
    bottom: 0;
    height: 54px;
    background-color: #fff;
    width: 100%;
    .add {
      background-color: #fc4141;
      color: #fff;
      font-size: 16px;
      height: 38px;
      margin: 0 16px;
      width: 100%;
      border-radius: 20px;
      .text {
        margin-left: 4px;
      }
    }
  }
}
</style>
