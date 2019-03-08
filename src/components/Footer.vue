<template>
<div class="footer">
  <div>
    <div>
      <img src="./../assets/img/home/c.png" alt="">
    </div>
    <div></div>
    <div>
      <ul>
        <li>
          <a target="_blank" :href="yinsi">{{langpack.l_yinsi}}</a>
        </li>
        <li>
          <a target="_blank" :href="user">{{langpack.l_youhu}}</a>
        </li>
        <li>
          <a target="_blank" :href="api">{{langpack.l_docs}}</a>
        </li>
        <li>
          <router-link tag="a" target="_blank" to="/up_coin">{{langpack.y_apply}}</router-link>
        </li>
        <li>
          <a target="_blank" :href="support">{{langpack.l_support}}</a>
        </li>

      </ul>
    </div>
  </div>


  <div>
    Copyright © 2019 ET. All Rights Reserved.
  </div>
</div>
</template>


<script>
import { mapGetters } from 'vuex'
export default{
  name: 'Footer',
  computed: {
    ...mapGetters([
      'langpack',
      'langType'
    ])
  },
  data(){
    return {
      yinsi: 'https://etoex.com/zh-cn/articles/127_',
      user: 'https://etoex.com/zh-cn/articles/128_',
      support: 'https://etoex.com/zh-cn/support',
      api: 'https://developer.et.exchange/zh-cn.html'
    }
  },
  mounted() {
    let lang = ''
    if(this.langType == 'cn'){
      lang = 'zh-cn';
    }else if(this.langType == 'en'){
      lang = 'en-us'
    }
    this.yinsi = `https://etoex.com/${lang}/articles/127_`;
    this.user = `https://etoex.com/${lang}/articles/128_`;
    this.support = `https://etoex.com/${lang}/support`;
  }
}
</script>

<style lang="less" scoped>
.footer{
  width: 100%;
  height: 243px;
  position: relative;
  >div:nth-child(1){
    padding-top: 48px;
    position: relative;
    width: 940px;
    margin: 0 auto;
    text-align: left;
    >div:nth-child(1){
        width: 34%;
        float: left;
    }
    >div:nth-child(2){
      position: absolute;
      top: 60px;
      left: 254px;
      width: 1px;
      height: 71px;
      float: left;
      background-color: #242c43;
    }
    >div:nth-child(3){
      /* border-left: 1px solid #242c43; */
      width: 65%;
      float: left;
      box-sizing: border-box;
      /* height: 71px; */
      >ul{
        width: 100%;
        >li{
          width: 33%;
          float: left;
          text-align: center;
          margin-bottom: 30px;
          margin-top: 10px;
          a{
            // text-decoration: underline;
            font-size: 16px;
            color: #c1cddc;
          }
        }
      }
    }

  }
  >div:nth-child(2){
    height: 58px;
    background-color: #242c43;
    width: 100%;
    position: absolute;
    bottom: 0;
    line-height: 58px;
    text-align: center;
    color: #c1cddc;
    font-size: 14px;
  }
}
</style>
