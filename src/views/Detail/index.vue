<template>
  <div id="Detail">
    <van-swipe class="swipe1" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in storeInfo.slider_image" :key="image">
        <img :src="image" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="bg_white">
      <div class="price flex-space">
        <div class="left flex-row">
          <div class="default">￥{{ storeInfo.price }}</div>
          <div class="vip_price flex-row">
            <span>￥{{ storeInfo.vip_price }}</span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
              alt=""
            />
          </div>
        </div>
        <div class="right">
          <van-icon name="share"></van-icon>
        </div>
      </div>
      <div class="store_name flex-row">
        <span>{{ storeInfo.store_name }}</span>
      </div>
      <div class="store_sale flex-space">
        <span>原价：￥{{ storeInfo.ot_price }}</span>
        <span>库存：{{ storeInfo.stock }}{{ storeInfo.unit_name }}</span>
        <span>销量：{{ storeInfo.sales }}{{ storeInfo.unit_name }}</span>
      </div>
    </div>
    <div class="bg_white pinglun flex-space">
      <div class="left">用户评价(0)</div>
      <router-link class="right" :to="`/evaluate_list/${detailId}`">
        <span>0%</span>
        好评率
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
    <div class="bg_white better">
      <Title title="优品推荐"></Title>
      <div class="list">
        <van-swipe>
          <van-swipe-item
            v-for="swipe in Math.ceil(good_list.length / 6)"
            :key="swipe"
            class="swipe_item flex-space"
          >
            <ExcellentItem
              v-for="item in good_list.slice(6 * (swipe - 1), 6 * swipe)"
              :key="item.id"
              :excellentItem="item"
              class="swipe_item_item"
            ></ExcellentItem>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="jieshao">
      <div class="title bg_white flex-center">产品介绍</div>
      <div class="desc" v-html="storeInfo.description"></div>
    </div>
    <footer class="detail_footer">
      <van-goods-action>
        <van-goods-action-icon
          icon="service-o"
          text="客服"
          :to="`/customer/list/${detailId}`"
        />
        <van-goods-action-icon
          :class="{ collect_active: storeInfo.userCollect }"
          :icon="storeInfo.userCollect ? 'star' : 'star-o'"
          text="收藏"
          @click="do_collect"
        />
        <van-goods-action-icon
          :badge="cartCount"
          icon="cart-o"
          text="购物车"
          to="/shop"
        />
        <van-goods-action-button text="加入购物车" @click="add_shop('add')" />
        <van-goods-action-button
          primary
          text="立即购买"
          @click="add_shop('buy')"
        />
      </van-goods-action>
    </footer>

    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goods"
      :goods-id="detailId"
      show-add-cart-btn
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      :safe-area-inset-bottom="true"
      @buy-clicked="onBuyClicked"
    >
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span
          ><span class="van-sku__price-num">{{ props.price }}</span>
        </div>
      </template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button
            type="primary"
            size="large"
            color="#FC4141"
            round
            bottom-action
            @click="props.skuEventBus.$emit('sku:buy')"
            >确认</van-button
          >
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import Title from "@cmpt/Title/index.vue";
import ExcellentItem from "@cmpt/ExcellentItem/index.vue";
import { Toast } from "vant/lib";
export default {
  components: {
    Title,
    ExcellentItem,
  },
  data() {
    return {
      detailData: {},
      detailId: "",
      storeInfo: {},
      similarity: [],
      good_list: [],
      cartCount: 0,
      showSku: false,
      sku: {},
      goods: {},
      handleType: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.init();
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.get_detail_id();
      this.get_detail_data();
      this.get_cart_count();
    },
    get_detail_id() {
      let href = location.href;
      let href_arr = href.split("/");
      this.detailId = href_arr[href_arr.length - 1];
    },
    async get_detail_data() {
      let detail_data = await this.$api({
        method: "GET",
        url: "/product/detail/" + this.detailId,
      });
      let { storeInfo, similarity, good_list } = detail_data;
      this.storeInfo = storeInfo;
      this.similarity = similarity;
      this.good_list = good_list;
      this.detailData = detail_data;
      this.deal_sku(detail_data);
    },
    async get_cart_count() {
      let cart_count = await this.$api({
        method: "GET",
        url: "/cart/count",
        data: {
          numType: 0,
        },
      });
      this.cartCount = cart_count.count;
    },
    do_collect() {
      this.$api({
        method: "POST",
        url: "/collect/add",
        data: {
          category: "product",
          id: this.detailId,
        },
      }).then(() => {
        this.get_detail_data();
      });
    },
    add_shop(type) {
      if (!this.showSku) {
        this.showSku = true;
        this.handleType = type;
      }
    },
    onBuyClicked(data) {
      let { goodsId: productId, selectedNum: cartNum, selectedSkuComb } = data;
      switch (this.handleType) {
        case "add":
          this.$api({
            method: "POST",
            url: "/cart/add",
            data: {
              new: 0,
              productId,
              cartNum,
              uniqueId: selectedSkuComb?.unique || "",
            },
          }).then(() => {
            Toast.success("添加成功");
            this.get_cart_count();
            this.showSku = false;
          });
          break;
        case "buy":
          this.$api({
            method: "POST",
            url: "/cart/add",
            data: {
              new: 0,
              productId,
              cartNum,
              uniqueId: selectedSkuComb?.unique || "",
            },
          }).then((res) => {
            this.del_coolect(res.cartId);
            this.$router.push(`/order/submit/${res.cartId}`);
          });
          break;
      }
    },
    del_coolect(id) {
      this.$api({
        method: "POST",
        url: "/cart/del",
        data: {
          ids: [id],
        },
      });
    },
    deal_sku(data) {
      let {
        productAttr,
        storeInfo: { price, stock, image, store_name },
      } = data;
      let sku = {};
      let tree = [];
      let list = [];
      let pv_data = Object.values(data.productValue);
      tree = productAttr?.map((attr_item, attr_idx) => {
        return {
          k: attr_item.attr_name,
          v: attr_item.attr_value.map((v) => ({
            name: v.attr,
            check: v.check,
            id: v.attr,
          })),
          k_s: "s" + attr_idx,
        };
      });
      list = pv_data?.map((pv_item) => {
        let sku_arr = pv_item.suk.split(",");
        let sku_obj = {};
        sku_arr.forEach((s, i) => (sku_obj[`s${i}`] = s));
        return {
          stock_num: pv_item.stock,
          price: pv_item.price * 100,
          ...sku_obj,
          unique: pv_item.unique,
        };
      });
      sku = {
        tree,
        list,
        price,
        stock_num: stock,
      };
      this.sku = sku;
      this.goods = {
        title: store_name,
        picture: image,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
#J_DcTopRightWrap,
.skin-box-bd,
.content {
  width: 100% !important;
}
.van-goods-action {
  &-icon {
    .van-info {
      background-color: #fc4141;
    }
  }
  &-button {
    color: #fff;
    &--first {
      background: linear-gradient(to right, #ffd01e, #ff8917);
    }
    &--last {
      background: linear-gradient(to right, #ff6034, #ee0a24);
    }
  }
}
</style>
