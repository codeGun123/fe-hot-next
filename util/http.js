// https://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html
// 输出两个get post方法
import fetch from 'isomorphic-unfetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const options = {
  // 可跨域携带cookie
  credentials: 'include'
};

// 带测试
export default function request(url, options) {
  let opt = options || {};
  return fetch(url, { credentials: 'include', mode: 'cors', ...opt })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err);
}