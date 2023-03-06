<template>
  <div class="evaluate flex-space">
    <div class="left flex-row">
      <div class="text">评分</div>
      <van-rate v-model="value" size="16" readonly color="#fc4141" />
    </div>
    <div class="right">
      <span>0.00%</span>
      好评率
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.evaluate {
  height: 48px;
  padding: 20px;
  font-size: 14px;
  .left {
    .text {
      color: #fc4141;
      padding-right: 10px;
    }
  }
  .right {
    span {
      color: #fc4141;
    }
  }
}
</style>
