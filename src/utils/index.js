export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

// 防抖
export function debounce() {
  let timer = 0;
  let lastTimer = 0;
  return function (fn, delay = 300, immediate = true) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      // 立即执行
      let callNow = !timer;
      timer = setTimeout(() => {
        if (lastTimer !== timer) {
          timer = 0;
          lastTimer = 0;
          fn();
        }
      }, delay);
      if (callNow) {
        lastTimer = timer;
        fn();
      }
    } else {
      // 非立即执行
      timer = setTimeout(() => {
        fn();
        timer = 0;
      }, delay);
    }
  };
}
