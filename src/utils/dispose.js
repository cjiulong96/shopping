import request from "./request";
import { Local } from "./storage";
import store from "../store";
import { Toast } from "vant";

function sendAjax(obj, type = {}) {
  return new Promise((resolve, reject) => {
    const { url, headers } = obj;
    let defaultHeader = {
      // token: Local.get("TOKEN"),
      "Authori-zation": "Bearer " + Local.get("TOKEN"),
      "Content-Type": "application/json; charset=utf-8",
    };
    for (let i in defaultHeader) {
      if (
        !defaultHeader[i] ||
        defaultHeader[i] === "Bearer" ||
        defaultHeader[i] === "Bearer undefined"
        // defaultHeader[i] === "Bearer null"
      ) {
        delete defaultHeader[i];
      }
    }
    obj.url = this.$apiUrl + url;
    obj.headers = Object.assign(defaultHeader, headers);
    request(obj).then((res) => {
      switch (res.status) {
        case 410000:
          // token失效
          store.dispatch("user/resetToken");
          window.location.href = window.location.origin + "/login";
          Toast({
            message: res.msg,
            type: "fail",
            position: "top",
            duration: 1500,
          });
          reject(res);
          break;
        case 400:
          Toast({
            message: res.msg,
            type: "fail",
            position: "top",
            duration: 1500,
          });
          reject(res);
          break;
        default:
          if (res.status === 200) {
            resolve(res.data);
          } else {
            if (type?.type === "Blob") {
              if (res.type !== "application/json") {
                resolve(res);
              } else {
                // 处理blob格式的错误信息
                let reader = new FileReader();
                reader.onload = function () {
                  let result = reader.result;
                  res = JSON.parse(result);
                  Toast({
                    message: res.msg || "网络异常",
                    type: "fail",
                    position: "top",
                    duration: 1500,
                  });
                  reject(res);
                };
                reader.readAsText(res, "utf-8");
              }
            } else {
              Toast({
                message: res.msg || "网络异常",
                type: "fail",
                position: "top",
                duration: 1500,
              });
              reject(res);
            }
          }
          break;
      }
    });
  });
}
export default sendAjax;
