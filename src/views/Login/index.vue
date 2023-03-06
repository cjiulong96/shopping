<template>
  <div id="login">
    <div class="logo">
      <div class="picture flex-center">
        <img src="http://47.115.51.185/h5/img/logo2.47964cc3.png" alt="" />
      </div>
    </div>
    <div class="white_bg">
      <van-tabs v-model="active" animated>
        <van-tab title="快速登录" class="fast">
          <div class="phone flex-row item">
            <van-icon name="phone-o"></van-icon>
            <input
              v-model="loginData.account"
              type="text"
              placeholder="输入手机号码"
            />
          </div>
          <div class="code flex-row item">
            <van-icon name="bulb-o"></van-icon>
            <input
              v-model="loginData.code"
              type="number"
              placeholder="填写验证码"
            />
            <div class="get_code flex-center">获取验证码</div>
          </div>
          <div class="do_login flex-center" @click="do_login">登录</div>
          <div class="tip flex-center">
            <span>没有账号？</span>
            <span>立即注册</span>
          </div>
        </van-tab>
        <van-tab title="账号登录" class="fast account">
          <div class="phone flex-row item">
            <van-icon name="phone-o"></van-icon>
            <input
              v-model="loginData.account"
              type="text"
              placeholder="输入手机号码"
            />
          </div>
          <div class="code flex-row item">
            <van-icon name="bulb-o"></van-icon>
            <input
              v-model="loginData.password"
              type="password"
              placeholder="输入密码"
            />
          </div>
          <div class="forgot_password flex-center">
            <van-icon name="question-o"></van-icon>
            <div class="text">忘记密码</div>
          </div>
          <div class="do_login flex-center" @click="do_login">登录</div>
          <div class="tip flex-center">
            <span>没有账号？</span>
            <span>立即注册</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Local, Cookie } from "@/utils/storage";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      active: 0,
      loginData: {
        account: "",
        code: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState({
      lastPath: (state) => state.user.lastPath,
    }),
  },
  created() {
    this.$store.dispatch("user/resetToken");
    this.get_verify_code();
  },
  methods: {
    ...mapActions({
      login_x: "user/login",
    }),
    get_verify_code() {
      this.$api({
        method: "GET",
        url: "/verify_code",
      }).then((res) => {
        Cookie.set("login_status", res.key, 3 / 24);
      });
    },
    do_login() {
      if (!this.loginData.account) {
        return Toast("请输入账号");
      }
      if (!this.loginData.code && this.active === 0) {
        return Toast("请输入验证码");
      }
      if (!this.loginData.password && this.active === 1) {
        return Toast("请输入密码");
      }
      this.$api({
        method: "POST",
        url: "/login",
        data: this.loginData,
      }).then((res) => {
        Local.set("TOKEN", res.token);
        let t = new Date(res.expires_time).getTime() - new Date().getTime();
        setTimeout(() => {
          Local.remove("TOKEN");
        }, t);
        let lPath = this.lastPath || "/";
        this.$router.push(lPath);
        this.login_x(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
