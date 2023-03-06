import axios from "axios";
import { Toast } from "vant";

let isAntiShake = true; // post节流参数

const service = axios.create({
  baseURL: "",
  timeout: 30000,
});
//请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Toast({
      message: `requestError:${error.message}`,
      type: "fail",
      position: "top",
      duration: 5000,
    });
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Toast({
      message: `requestError:${error.message}`,
      type: "fail",
      position: "top",
      duration: 5000,
    });
    return Promise.reject(error);
  }
);

/**
 *请求封装
 *url:完整接口路径
 *method:get||post
 *data:请求参数对象
 *customSuccess:Bool自定义处理请求成功结果code不为200时进行回调
 */

function sendAxios(obj) {
  const { method, data } = obj;
  obj.method = method.toUpperCase() || "POST";
  if (isAntiShake) {
    if (obj.method === "POST") {
      // isAntiShake = false;
    }
    let axiosObj = {
      ...obj,
      [obj.method === "GET" ? "params" : "data"]: data,
    };
    return service(axiosObj);
  }
}

export default sendAxios;
