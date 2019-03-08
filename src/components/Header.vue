<template>
  <div class="header">
    <div class="header_left" @click="tag">
      <i style="display: inline-block;height: 100%;vertical-align: middle;padding-top: 5px;">
        <router-link to="/">
          <img src="./../assets/img/logo/logo.png" alt="">
        </router-link>
      </i>
      <span :class="{isActive: isActive == 1}" id="1">{{langpack.y_coin_exchange}}</span>
      <!-- <span :class="{isActive: isActive == 2}" id="2">{{langpack.y_out_exchange}}</span> -->
      <span :class="{isActive: isActive == 3}" id="3">{{langpack.y_apply}}</span>
      <!-- <span :class="{isActive: isActive == 4}" id="4">{{langpack.y_news}}</span> -->
    </div>
    <div class="header_right">
      <a style="cursor:pointer" @click="goPersonal" :class="{isActive: isActive == 5}" v-show="isLogin">{{langpack.y_val}}</a>
      <div>
        <span @click="getLog(1)" id="logIn" v-show="!isLogin">{{langpack.y_sign}}</span>
        <span @click="getLog(2)" v-show="!isLogin">{{langpack.y_res}}</span>
        <Login :isLog="logNum"  ref="log"/>
      </div>
      <div class="avater" v-show="isLogin">
        <i>
          <img @click="showMsg" src="./../assets/img/logo/avater.png" alt="">
        </i>
        <el-select class="avaterSel" v-model="type" placeholder="请选择">
          <el-option
            v-for="(item,index) in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <div @click="account_cen(index)" style="width:180px;">
                <b>{{ item.label }}</b>
                <em>{{ item.value }}</em>
            </div>
          </el-option>
        </el-select>
      </div>
      <div class="lang">
        <i>
          <img @click="showMsgLang" src="./../assets/img/logo/lang.png" alt="">
        </i>
        <el-select class="langSel" v-model="langType" placeholder="请选择" width="60px">
          <el-option
            v-for="(item,index) in langArr"
            :key="item.label"
            :label="item.label"
            :value="item.value">
            <div style="width:80px;" @click="changeLang(index)">
                <em style="display:inline-block;padding:15px 0">{{ item.value }}</em>
            </div>
          </el-option>
        </el-select>
      </div>

    </div>


  </div>
</template>

<script>
  import Login from './Login'
  import { mapGetters } from 'vuex'
  import  Bus  from './../bus.js'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'Header',
    computed: {
        ...mapGetters([
            'langpack',
            // 'isLogin',
            'lang',
            'email',
            'recommend',
            'initCoin'
        ]),
        isLogin: {
            get: function() {
                return this.$store.state.user.isLogin
            },
            set: function(newValue) {
                return this.$store.state.user.isLogin = newValue
            }
        }
    },
    data() {
      return {
        aaa: '1211212',
        langType: '',
        type: '',
        logNum: 1,
        isActive: 0,  //1币币交易,c2c场外交易,3上币申请,4新闻
        cities: [],
        langArr: [{
          value: '简体中文',
          label: '北京'
        }, {
          value: 'English',
          label: '上海'
        }],
        isLang: false
      }
    },
    methods: {
        goPersonal(){
            if(this.isLogin){
                 this.isActive = 5;
                this.$router.push('/personal_center');
            }else{
                window.$alert('').then(() => {
                    this.$store.dispatch('FedLogOut').then(() => {
                      location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }

        },
      alert(){
        window.alert();
      },
      getLang(){
        if(this.isLang == false){
          $('.getLang').slideDown(200);
          this.isLang = true;
        }else {
          $('.getLang').slideUp(200)
          setTimeout(()=>{
            this.isLang = false;
          },100)
        }
      },
      changeIsLogin() {

      },
      changeLang(index){
        var storage = window.localStorage;
        if(index == 0){//中文
          this.$store.commit('SET_LANGPACK',this.lang['cn']);
          this.$store.commit('SET_LANGTYPE','cn');
          storage.setItem('language','cn');
        }else if(index == 1){//英文
          this.$store.commit('SET_LANGPACK',this.lang['en']);
          this.$store.commit('SET_LANGTYPE','en');
          storage.setItem('language','en');
        }else if(index == 2){//日文
          this.$store.commit('SET_LANGPACK',this.lang['ko']);
          this.$store.commit('SET_LANGTYPE','ko');
          storage.setItem('language','ja');
        }
        location.reload();
      },
      tag(e){
        if (e.target.nodeName.toLowerCase() === 'span') {
            let text = e.target.id;
            if(text == '1') {
              this.isActive = 1;
                  if(this.recommend.length > 0) {
                      this.$router.push({path: '/transaction',query:{pair:this.recommend[0].pair}})
                  }else{
                      this.$router.push({path: '/transaction',query:{pair:this.initCoin}})
                  }
            }else if(text == '2') {
              this.isActive = 2;
            }else if(text == '3') {
              this.isActive = 3;
              this.$router.push('/up_coin');
            }else if(text == '4') {
              this.isActive = 4;
            }else{
              this.isActive = 0;
            }
          }else{
            this.isActive = 0;
          }
      },
      getLog(num) {
        this.logNum = num;
        if(num == 1){
          this.$nextTick(() => {
            this.$refs.log.onInit();
          })
        }
        this.$refs.log.logIn(num);

      },
      showMsg(){
        setTimeout(function(){
          let left = $('.el-select-dropdown').position().left;
          let a = $('.avater').offset().left;
          $('.el-select-dropdown').css('left',a-130);
        },0)
        $('.avaterSel').trigger('click');
      },
      getExhange(){
          var _this= this;
        this.$api.get('/exchange', {}).then((res) => {
          if(res.code == 0 && res.status == 0){
            let data = res.data;
            _this.$store.commit('SET_EXCHANGE',data);

          }
        }).catch((res) => {
          window.$alert(res)
        })
      },
      showMsgLang(){
        $('.langSel').trigger('click');
      },
      account_cen:function (index) {
        if(index  == 0){
          location.href = "#/account_center";
        }else if(index == 2){
          this.$store.dispatch('FedLogOut').then(() => {
            // this.$router.push({ path: '/' })
            location.reload();
          })
        }
      },
      getCoin() {
        if(!this.isLogin){
          return false;
        }
        this.$api._get('/users/coin/asset',{}).then((res) => {
          if(res.data.assets){
            let str = `${res.data.total_usdt} USDT`;
            this.cities = [{
                value: this.email,
                label: this.langpack.y_my_account
            },{
                value: str,
                label: this.langpack.y_balance
            },{
                value: '',
                label: this.langpack.y_out
            }]
          } else {
            window.$alert(res.data)
          }
        }).catch((res) => {
          window.$alert(res)
        })
      },
      go() {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.push({ path: '/' })
          location.reload();
        })
      }
    },
    mounted() {
      // this.isLogin = this.$store.state.user.isLogin;
      this.getExhange();
      setInterval(() => {
        this.getExhange();
      },900000)
      let _this = this;
      Bus.$on('changeLogin',() => {
          this.isLogin = 0
          this.$store.commit('SET_LOGIN',0)
      })
    },
    created() {
      this.getCoin();

    },
    components: {
      Login
    }
  }
</script>
<style lang="less">
  .el-select-dropdown{
    border: solid 1px #758ba9!important;
    /* min-width: 220px!important; */
    /* left: 942px!important; */
    top: 56px!important;
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #253045!important;
  }
  .el-select-dropdown__list{
    background-color: #253045;

    border-radius: 3px;
    padding: 0;
    line-height: 0px;

  }
  .el-select-dropdown__item{
    height: auto!important;
    color: #c1cddc;
    line-height: 17px!important;
    >div{
      border-top: 0.5px solid rgba(117, 139, 169, 0.7);
      display: flex;
      height: auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      b {
          display: inline-block;
          font-size: 12px;
          color: #758ba9;
          padding: 10px 0px 2px 0px;
          box-sizing: border-box;
          font-weight: normal;
      }
      em {
          display: inline-block;
          color: #c1cddc;
          padding: 2px 0px 10px 0px;
          box-sizing: border-box;
          font-size: 12px;
      }
    }

  }
  .el-select-dropdown__item:nth-child(1){
    >div:nth-child(1){
      border: none;
    }
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #253045!important;
  }
  .el-input{
    /* display: none!important; */
    /* visibility: hidden; */
    cursor: pointer;
  }
  .el-input__suffix{
    display: none;
  }
  .el-select .el-input__inner{
    padding: 0;
  }
  .popper__arrow{
    left: 137px!important;
  }
</style>
<style scoped="scoped" lang="less">
.el-select{
  cursor: pointer;
  width: 30px;
  visibility: hidden;
}
.header{
  display: flex;
  justify-content: space-between;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  background: #151c2b;
  .header_left{
    span{
      font-size: 14px;
      color: #FFFFFF;
      margin: 0 15px;
      cursor: pointer;
    }
    i{
      margin-right: 35px;
      >img{
        display: inline-block;
        height: 23px;
        vertical-align: middle;
        margin-bottom: 8px;
      }
    }
    .isActive{
      color: #3d96ff
    }

  }
  .header_right{
      .isActive{
        color: #3d96ff
      }
    a{
      float: left;
      margin: 0 15px;
      color: #ffffff;
    }
    >div{
      float: left;
      margin: 0 15px;
      color: #ffffff;
      span{
        cursor: pointer;
        display: inline-block;
        margin: 0 15px;
      }
    }
    a{
        float: left;
        margin: 0 15px;
        color: #ffffff;
        font-size: 14px;
    }
    >div:nth-child(1){
      cursor: pointer;
    }
    >div:nth-child(2){
      position: relative;
      i{
        display: inline-block;
        position: absolute;
        z-index: 3000;
        cursor: pointer;
        top: 12px;
      }
    }
    >div:nth-child(3){
      position: relative;
      i{
        display: inline-block;
        position: absolute;
        z-index: 3000;
        cursor: pointer;
        top: 12px;
      }
    }
    .lang{
      position: relative;
      >div{
        position: relative;
      }

      >ul{
        position: absolute;
        /* top: 68px; */
        width: 100px;
        z-index: 20000;
        background: red;
        border: solid 0.5px #758ba9;
        background-color: #253045;
        padding: 10px 10px;
        line-height: 40px;
        text-align: center;
        left: -50px;

        border-radius: 4px;
        >span{
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 6px;
          border-top-width: 0;
          border-bottom-color: #ebeef5;
          position: absolute;
          top: -5px;
          border-bottom-color: #253045 !important;
        }
        li{
          cursor: pointer;
          /* line-height: 0px; */
        }

      }
    }
    >div:nth-child(4){
      position: relative;
      padding-top: 6px;
      img{
        cursor: pointer;
      }
    }
  }
}
</style>
