import request from '@/utils/request'
import store from '@/store/index'

var qs = require('qs');
import Cookies from 'js-cookie'

var storage = window.localStorage;
var lang = '';
const BASE_URL = process.env.BASE_API;
// const _timestamp = Date.now();
// const timestamp = _timestamp;

// request拦截器
// function getHeader(sign,timestamp){
//   request.interceptors.request.use(
//     config => {
//       config.headers['ET-API-KEY'] = api_key;
//       console.log(sign);
//       config.headers['ET-TIMESTAMP'] = timestamp;
//       config.headers['ET-SIGNATURE'] = sign;
//       config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//       return config
//     },
//     error => {
//       console.log(error) // for debug
//       Promise.reject(error)
//     }
//   )
// }


//公共参数
let langs = 'en-us';
if(store.getters.langType){
  if(store.getters.langType == 'cn'){
    langs = 'zh-cn'
  }else if(store.getters.langType == 'en'){
    langs = 'en-us'
  }
}else{
  langs = 'en-us'
}
let uid = store.getters.uid;
let token = store.getters.token;



export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function sign(email, password, invite) {
    var data_url = {
        email,
        password
    }
    if(store.getters.langType){
      if(store.getters.langType == 'cn'){
        langs = 'zh-cn'
      }else if(store.getters.langType == 'en'){
        langs = 'en-us'
      }
    }else{
      langs = 'en-us'
    }
    let url = BASE_URL + '/user/reg?lang=' + langs;
    let timestamp = new Date().getTime();
    let data = qs.stringify(data_url);
    return request({
        url: url,
        method: 'post',
        data: data,
        headers: {
            // 'ET-API-KEY': api_key,
            'ET-TIMESTAMP': timestamp,
            // 'ET-SIGNATURE': sign
        }
    })
}


export default {
    post: function (url, data_url) {
        if(store.getters.langType){
          if(store.getters.langType == 'cn'){
            langs = 'zh-cn'
          }else if(store.getters.langType == 'en'){
            langs = 'en-us'
          }
        }else{
          langs = 'en-us'
        }
        // var base_url = BASE_URL + url + "?lang=";
        var base_url = BASE_URL + url;
        data_url.lang = langs;
        // base_url = base_url + langs + '&';
        let timestamp = new Date().getTime();
        let data = qs.stringify(data_url);
        return request({
            url: url,
            method: 'POST',
            headers: {
                // 'ET-API-KEY': api_key,
                'ET-TIMESTAMP': timestamp,
                'ET-SIGNATURE': sign
            },
            data: data
        })
    },
    get: function (url, data_url) {
        data_url = data_url || {};
        var data_all = data_url;
        let base_url = BASE_URL + url;
        let timestamp = new Date().getTime();
        // let sign = sign_post('GET', base_url, data_all, timestamp);
        return request({
            url: url,
            method: 'GET',
            params: data_url,
            headers: {
                // 'ET-API-KEY': api_key,
                'ET-TIMESTAMP': timestamp,
                // 'ET-SIGNATURE': sign
            },

        })
    },
    _get: function (url, data_url) {
        data_url = data_url || {};
        var data_all = data_url;
        let base_url = BASE_URL + url + "?";
        let timestamp = new Date().getTime();

        data_all.lang = langs;
        data_all.token = token;
        data_all.uid = uid;
        // let sign = sign_post('GET', base_url, data_all, timestamp);
        return request({
            url: url,
            method: 'GET',
            params: data_url,
            headers: {
                'ET-API-KEY': api_key,
                'ET-TIMESTAMP': timestamp,
                // 'ET-SIGNATURE': sign
            },

        })
    },
    _post: function (url, data_url) {
        var data_all = data_url;
        let base_url = BASE_URL + url + "?";
        let timestamp = new Date().getTime();

        data_all.lang = langs;
        data_all.token = token;
        data_all.uid = uid;
        // let data = qs.stringify(data_url);
        // let sign = sign_post('POST', base_url, data_all, timestamp);
        return request({
            url: url,
            method: 'POST',
            params: data_url,
            headers: {
                'ET-API-KEY': api_key,
                'ET-TIMESTAMP': timestamp,
                // 'ET-SIGNATURE': sign
            },

        })
    },
}
