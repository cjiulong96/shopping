export const Local = {
  // 设置永久缓存
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  // 获取永久缓存
  get(key) {
    let json = window.localStorage.getItem(key);

    return json !== "undifined" ? JSON.parse(json) : null;
  },
  // 移除永久缓存
  remove(key) {
    window.localStorage.removeItem(key);
  },
  // 移除全部永久缓存
  clear() {
    window.localStorage.clear();
  },
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  // 设置临时缓存
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  // 获取临时缓存
  get(key) {
    let json = window.sessionStorage.getItem(key);
    return JSON.parse(json);
  },
  // 移除临时缓存
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear();
  },
  // 获取临时缓存
  getCorporationId() {
    let json = window.sessionStorage.getItem("userInfo");
    const data = JSON.parse(json);
    if (!data || !data.user || !data.user.corporation) {
      return "";
    }
    return data.user.corporation.corporation_id;
  },
};

export const Cookie = {
  set(key, value, expires) {
    let date = new Date();
    date.setDate(date.getDate() + expires);
    document.cookie = `${key}=${value};expires=${date};`;
  },
  get(key) {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split("; ");
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split("=");
      return arr[0] === key ? arr[1] : "";
    }
    return "";
  },
  remove(key) {
    this.set(key, 1, -1);
  },
  clear() {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split("; ");
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split("=");
      this.set(arr[0], 1, -1);
    }
  },
};
