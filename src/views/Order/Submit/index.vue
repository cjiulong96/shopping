<template>
  <div class="submit">
    <div class="address">
      <div class="type">
        <div class="item item1"></div>
        <div class="item item2" @click="change_type(2)"></div>
      </div>
      <div
        class="desc flex-space"
        @click="showAddr = true"
        v-if="Object.keys(this.curAddr).length"
      >
        <div class="left">
          <div class="user flex-row">
            <div class="name">{{ curAddr.real_name }}</div>
            <div class="phone">{{ curAddr.phone }}</div>
          </div>
          <div class="addr flex-row">
            <div class="default" v-if="curAddr.is_default">[默认]</div>
            <div class="all_addr">{{ curAddr | address_str }}</div>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
      <div class="line">
        <img src="http://47.115.51.185/h5/img/line.05bf1c84.jpg" alt="" />
      </div>
    </div>

    <van-action-sheet v-model="showAddr" title="选择地址" class="select_addr">
      <div class="content">
        <div class="add_list">
          <div
            :class="[
              'addr_item flex-space',
              { checked: curAddr.id === item.id },
            ]"
            v-for="item in addrList"
            :key="item.id"
            @click="change_addr(item)"
          >
            <van-icon name="location-o"></van-icon>
            <div class="msg">
              <div class="user">
                <span class="name">{{ item.real_name }}</span>
                <span>{{ item.phone }}</span>
              </div>
              <div class="addr">{{ item | address_str }}</div>
            </div>
            <van-icon name="success"></van-icon>
          </div>
        </div>
        <div class="btn_box">
          <van-button
            class="add_btn"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            round
            size="large"
            to="/user/add_address"
            >新增地址</van-button
          >
        </div>
      </div>
    </van-action-sheet>

    <div class="card_list">
      <div class="count">共{{ order.cartInfo?.length }}件商品</div>
      <van-card
        class="card"
        :num="item.cart_num"
        :price="item.productInfo.price"
        :desc="item.productInfo.attrInfo.suk"
        :title="item.productInfo.store_name"
        :thumb="item.productInfo.image"
        v-for="item in order.cartInfo"
        :key="item.id"
      />
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      class="coupon"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <div class="my_cell_box">
      <div class="cell flex-space">
        <div class="title">积分抵扣</div>
        <div class="value flex-row">
          <div class="gray">当前积分</div>
          <div class="jifen">{{ order.userInfo?.integral }}</div>
          <van-checkbox
            v-model="checked"
            checked-color="#FC4141"
          ></van-checkbox>
        </div>
      </div>
      <div class="cell flex-space">
        <div class="title">会员优惠</div>
        <div class="value">
          -￥{{ order.userInfo?.vip ? order.priceGroup?.vipPrice : 0 }}
        </div>
      </div>
      <div class="cell flex-space">
        <div class="title">快递费用</div>
        <div class="value">￥{{ order.priceGroup?.storePostage }}</div>
      </div>
      <div class="cell flex-col">
        <div class="title">备注信息</div>
        <div class="value">
          <textarea
            class="inp"
            v-model="remark"
            type="text"
            placeholder="添加备注（150字以内）"
          />
        </div>
      </div>
    </div>

    <div class="pay_way">
      <div class="title">支付方式</div>
      <div
        class="wechat flex-space"
        :class="{ active: payWay === 'weixin' }"
        @click="on_pay_way('weixin')"
      >
        <div class="left">
          <van-icon name="wechat" />
          <span>微信支付</span>
        </div>
        <div class="line"></div>
        <div class="right gray">微信快捷支付</div>
      </div>
      <div
        class="balance flex-space"
        :class="{ active: payWay === 'yue' }"
        @click="on_pay_way('yue')"
      >
        <div class="left">
          <van-icon name="gold-coin" />
          <span>余额支付</span>
        </div>
        <div class="line"></div>
        <div class="right gray">可用余额：{{ order.userInfo?.now_money }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="total flex-space">
        <span>商品总价：</span>
        <span class="gray">￥{{ order?.priceGroup?.totalPrice }}</span>
      </div>
      <div class="yunfei flex-space">
        <span>运费：</span>
        <span class="gray">+￥{{ order?.priceGroup?.storePostage }}</span>
      </div>
    </div>
    <van-submit-bar
      :price="total_price"
      button-text="立即结算"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { Session } from "@/utils/storage";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  data() {
    return {
      payWay: "yue",
      checked: false,
      remark: "",
      showAddr: false,
      addrList: [],
      curAddr: {},
      ids: this.$route.params.id,
      order: {},
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
    };
  },
  filters: {
    address_str(data) {
      let { province, city, district, detail } = data;
      return `${province}${city}${district}${detail}`;
    },
  },
  computed: {
    total_price() {
      let total = 0;
      try {
        if (Object.keys(this.order).length) {
          let { totalPrice, storePostage } = this.order?.priceGroup;
          let { integral } = this.order?.userInfo;
          total =
            (Number(totalPrice) +
              Number(storePostage) -
              Number(integral) * Number(this.checked)) *
            100;
        }
      } catch (err) {
        console.log("err====>>>>", err);
      }
      return total;
    },
  },
  created() {
    this.get_address_list();
    this.get_order();
  },
  methods: {
    on_pay_way(type) {
      this.payWay = type;
      this.$api({
        method: "POST",
        url: "/order/computed/" + this.order?.orderKey,
        data: {
          addressId: this.order?.addressInfo?.city_id,
          useIntegral: this.checked ? 1 : 0,
          couponId: 0,
          shipping_type: 1,
          payType: type,
        },
      });
    },
    onSubmit() {
      if (this.order?.orderKey) {
        this.$api({
          method: "POST",
          url: "/order/create/" + this.order?.orderKey,
          data: {
            real_name: "",
            phone: "",
            addressId: this.order.addressInfo.id,
            useIntegral: Number(this.checked),
            couponId: 0,
            payType: this.payWay,
            pinkId: 0,
            seckill_id: 0,
            combinationId: 0,
            bargainId: 0,
            from: "weixinh5",
            mark: "",
            shipping_type: 1,
            store_id: 0,
          },
        })
          .then((res) => {
            let obj = {
              payType: this.payWay === "yue" ? "余额支付" : "微信支付",
              totalPrice: this.total_price,
            };
            Session.set("orderStatus", obj);
            this.$router.push(`/order/status/${res.result.orderId}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push(coupon);
    },
    change_addr(item) {
      this.curAddr = item;
      this.showAddr = false;
    },
    change_type(type) {
      if (type === 2) {
        Toast("暂无门店");
      }
    },
    async get_address_list() {
      let addr_list = await this.$api({
        method: "GET",
        url: "/address/list",
        data: {
          page: 1,
          limit: 30,
        },
      });
      this.addrList = addr_list;
    },
    async get_order() {
      let order = await this.$api({
        method: "POST",
        url: "/order/confirm",
        data: { cartId: this.ids },
      });
      this.order = order;
      this.curAddr = order.addressInfo;
      this.on_pay_way(this.payWay);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
