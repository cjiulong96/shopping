<template>
  <div class="address_item">
    <div class="msg">
      <div class="addressee">
        <span>收货人：</span>
        <span class="real_name">{{ addressItem.real_name }}</span>
        <span>{{ addressItem.phone }}</span>
      </div>
      <div class="address">
        <span>收货地址：</span>
        <span>{{ addressItem | address_str }}</span>
      </div>
    </div>
    <div class="bottom flex-space">
      <van-checkbox
        v-model="addressItem.is_default"
        checked-color="#FC4141"
        @click="$emit('do_checked', addressItem)"
        >设为默认</van-checkbox
      >
      <div class="btns flex-row">
        <div class="edit" @click="$emit('do_edit', addressItem.id)">
          <van-icon name="edit"></van-icon>
          <span>编辑</span>
        </div>
        <div class="del" @click="$emit('do_del', addressItem.id)">
          <van-icon name="delete"></van-icon>
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["addressItem"],
  filters: {
    address_str(data) {
      let { province, city, district, detail } = data;
      return `${province}${city}${district}${detail}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.address_item {
  padding: 0 16px;
  font-size: 14px;
  color: #282828;
  text-align: left;
  margin-bottom: 6px;
  background-color: #fff;
  .addressee {
    font-weight: 700;
    margin-bottom: 4px;
    .real_name {
      margin-right: 12px;
    }
  }
  .msg {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
  }
  .bottom {
    height: 44px;
    .del {
      margin-left: 20px;
    }
  }
}
</style>
