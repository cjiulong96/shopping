<template>
  <div class="add_address">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      addressInfo: {},
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    onSave(content) {
      let {
        name: real_name,
        tel: phone,
        city,
        province,
        county: district,
        addressDetail: detail,
        isDefault: is_default,
        postalCode: post_code,
        areaCode: city_id,
      } = content;
      this.$api({
        method: "POST",
        url: "/address/edit",
        data: {
          detail,
          real_name,
          phone,
          is_default,
          post_code,
          address: {
            province,
            city,
            district,
            city_id,
          },
        },
      }).then(() => {
        Toast("保存成功");
        this.$router.push("/user/add_manage");
      });
    },
    async get_detail() {
      let { id } = this.$route.params;
      if (id) {
        let address_detail = await this.$api({
          method: "GET",
          url: "/address/detail/" + id,
        });
        let {
          real_name: name,
          phone: tel,
          province,
          city,
          district: county,
          detail: addressDetail,
          post_code: postalCode,
          is_default: isDefault,
          city_id: areaCode,
        } = address_detail;
        this.addressInfo = {
          country: "",
          name,
          tel,
          province,
          city,
          county,
          addressDetail,
          postalCode: postalCode ? postalCode : "",
          isDefault,
          areaCode: String(areaCode),
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
