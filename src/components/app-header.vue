<template>
  <div id="app-header" v-isuser="{loggedIn:loggedIn,fn:userInfo,fnload:startLoadingS}">
    <header class="white z-depth-1">
      <div class="container">
        <!-- 第一行，搜索框，时间 -->
        <div class="row">
          <div class="col s6 left-align">
            <div class="tool search">
              <i class="mdi mdi-magnify left small tooltipped" data-position='right' data-delay='50' data-tooltip="Press ' Ctrl + F '"></i>
            </div>
          </div>
          <div class="col s6 right-align">
            <date-time :isactive="time" :loggedin="loggedIn"></date-time>
          </div>
        </div>
        <!-- 第二行，now todo，user photo，next reminder -->
        <div class="row valign-wrapper" :class="{userrow:loggedIn}" style="margin-bottom: 0px;">
          <div class="input-field col s4">
            <input placeholder="正在专注做什么呢？" id="now" type="text" 
            ondragover="return false"
            @drop="dropText($event)"
            v-model="now">
            <label class="active" for="now">此刻</label>
            <!-- now What are you doing now?-->
          </div>
          <div class="col s4 center user">
            <!-- <img src="../../lib/imgs/Alex.jpg" alt="" class="circle responsive-img" > -->
            <div class="nickpic circle" v-show="loggedIn">
              <span class="nickletter">{{ nickletter }}</span>
            </div>
            <p class="showNickname" v-show="loggedIn" v-cloak>{{ nickname }}</p>
            <button class="btn-floating waves-effect waves-purple-lightodo white login-button" @click="userLogin" v-show="!loggedIn">
            <!-- ng-click="editButton.goToEdit()" ng-show="editButton.showButton" -->
                <!-- <i class="large material-icons">mode_edit</i> -->
                <i class="mdi mdi-account-outline"></i>
            </button>
            
            
          </div>
          <div class="input-field col s4">
            <input placeholder="重要的事放显眼的地方~" id="reminder" type="text" 
            ondragover="return false"
            @drop="dropText($event)"
            v-model="reminder">
            <label class="active" for="reminder">提醒</label>
            <!-- Reminder What need to be reminded?-->
          </div>
        </div>
        <!-- 第三行，名人名言，设置 -->
        <div class="row valign-wrapper">
          <div class="col s6 left-align">
            <quote :quote="quote" :loggedin="loggedIn"></quote>
          </div>
          <div class="col s6 right-align">
            <!-- <div class="tool setting"><i class="mdi mdi-settings right small"></i></div>  -->
            <span class="logout"  v-show="loggedIn&&!ifClicked" @click="clicked">退出</span>
            <p v-show="loggedIn&&ifClicked" ><span class="rusure">确认退出？</span><span class="logout" @click="signOut">确定</span><span class="logout" @click="clicked">取消</span></p>
          </div>
        </div>
      </div>
    </header>
    <div id="loginModal" class="overflow-visible modal card center-align">
      <div class="modal-close-button-mobile modal-close right-align hide-on-med-and-up">
        <i class="mdi mdi-close"></i>
      </div>
      <button class="btn-floating btn-large waves-effect waves-orange-lightodo white modal-close modal-close-button hide-on-small-only">
        <i class="mdi mdi-close"></i>
      </button>
      <div class="modal-content">        
        <!-- login -->
        <div v-show="hasAccount">
          <div class="row">
              <div class="form-title font-green">
                  登录
              </div>
          </div>

          <div class="row default-separator">
            <div class="row">
              <div class="input-field form-input col s12">
                <label for="email">邮箱</label>
                <input id="email" type="email" class="validate" v-model="login_email"
                @blur="ifEmpty($event,login_email)" @focus="this.$broadcast('btnReset')" autocomplete="off"
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field form-input col s12">
                <label for="password">密码</label>
                <input id="password" type="password" class="validate" v-model="login_password" @blur="ifEmpty($event,login_password)" @focus="this.$broadcast('btnReset')" autocomplete="off"
                >
              </div>
            </div>
            <!-- <a class="signinbtn btn-large btn-rnd" :class="{disabled:(!login_email)||(!login_password)}" @click="signIn">
                <span>Okay.</span>
            </a> -->
            <signup :disabled="signinDisabled" :failtip="'账号或密码错误'" @click="signIn($event)"></signup>
          </div>
          
          <div class="margin-sm">
              <span class="font-purple form-title">
                  还没有账号?
              </span>
          </div>

          <button class="signin-login-button btn-rnd btn-large font-grey waves-effect white margin-sm" @click="goSignup">
              注册
          </button>
          

        </div>
        <!-- signup -->
        <div v-else>
          <div class="row">
              <div class="form-title font-green">
                  注册
              </div>
          </div>

          <div class="row default-separator">
            <div class="row">
              <div class="input-field form-input col s12">
                <label for="nickname">昵称</label>
                <input id="nickname" type="text" class="validate" v-model="signup_nickname" @blur="ifEmpty($event,signup_nickname)" @focus="this.$broadcast('btnReset')" autocomplete="off">
              </div>
            </div>
            <div class="row">
              <div class="input-field form-input col s12">
                <label for="email">邮箱</label>
                <input id="email" type="email" class="validate" v-model="signup_email" @blur="ifEmpty($event,signup_email)" @focus="this.$broadcast('btnReset')" autocomplete="off">
              </div>
            </div>
            <div class="row">
              <div class="input-field form-input col s12">
                <label for="password">密码</label>
                <input id="password" type="password" class="validate" v-model="signup_password" @blur="ifEmpty($event,signup_password)" @focus="this.$broadcast('btnReset')" autocomplete="off">
              </div>
            </div>
            <!-- <a class="signupbtn btn-large  btn-rnd waves-effect waves-green-lightodo white font-green form-button" :class="{disabled:disabled}" @click="signUp"> -->
                <!-- <span>Okay.</span> -->
            <!-- </a> -->
            <signup :disabled="signupDisabled" :failtip="'电子邮箱已被使用'" @click="signUp($event)"></signup>
          </div>
          
          <div class="margin-sm">
              <span class="font-purple form-title">
                  已经是用户?
              </span>
          </div>

          <button class="signin-login-button btn-rnd btn-large font-grey waves-effect white margin-sm" @click="goLogin">
              登录
          </button>
        </div>   
      </div>   
    </div>
  </div>
</template>

<script>
import dateTime from './date-time.vue'
import quote from './quote.vue'
import signup from './signup.vue'
// import Wilddog from 'https://cdn.wilddog.com/js/client/current/wilddog.js'
// var Wilddog = require("wilddog");
// var Vue = require("vue");

export default {
  data () {
    return {
      now: null,
      reminder: null,
      ref: new Wilddog("https://lightodo.wilddogio.com/"),
      hasAccount:true,
      loggedIn:false,
      ifClicked:false,
      nickname:null,
      time:true,
      quote:null,
      signup_nickname:null,
      signup_email:null,
      signup_password:null,
      login_email:null,
      login_password:null,
      canUpdate:false
    }
  },
  computed:{
    uid:{
      get:function(){
        var authData = this.ref.getAuth();
        if(authData){
          this.loggedIn = true;
          console.log("Authenticated user with uid:", authData.uid);
          return authData.uid;
          // .replace('simplelogin:','');
        }else{
          return null;
        }
      },
      set:function(authData){
        if(authData){
          this.loggedIn = true;
          return authData.uid;
          // .replace('simplelogin:','');
        }else{
          return null;
        }
        
      }
    },
    userRef:function(){
      if(this.uid){
        console.log(this.loggedIn);
        return this.ref.child(this.uid);
      }else{
        return null;
      }
    },
    nickletter:function(){
      console.log(this.loggedIn)
      if(this.loggedIn&&this.nickname){
        return this.nickname[0];
        // return "a";
      }else{
        return null;
      }
    },
    signupDisabled:function(){
      return (!this.signup_nickname)||(!this.signup_email)||(!this.signup_password);
    },
    signinDisabled:function(){
      return (!this.login_email)||(!this.login_password);
    }
  },
  methods:{
    dropText:function(e){
      console.log(e);
      var text = e.dataTransfer.getData('Text').trim();
      console.log(text);
      if(e.target.id == 'now'){
        this.now = text;
      }else if(e.target.id == 'reminder'){
        this.reminder = text;
      }
      e.stopPropagation();
      return false;
    },
    userLogin:function(){
      var self = this;
      $('#loginModal').openModal();
      // 关闭模态框后将 注册 的 btn 恢复到可点击状态
      // 同时去除 input 框的内容和一些提示样式
      $('body').on('click','.modal-close,.lean-overlay',function(){
        // $("#loginModal input.empty").removeClass('empty');
        // for(var i = 0; i < 5; i++){
        //   console.log('p');
        //   $('#loginModal input:eq('+ i +')').focus();
        //   $('#loginModal input:eq('+ i +')').blur();
        // }
        // $('#loginModal input').blur();
        $('#loginModal label.active').removeClass('active');
        $('#loginModal input.validate').attr('class','validate');
        // $('input[type=email]').css('background-color','transparent');
        self.login_email = null;
        self.login_password = null;
        self.hasAccount = true;
        self.signup_nickname = null;
        self.signup_email = null;
        self.signup_password = null;
        self.$broadcast('btnReset');
      })
    },
    goSignup:function(){
      // $('input[type=email]').css('background-color','transparent');
      $("#loginModal input.empty").removeClass('empty');
      $('#loginModal input').blur();
      this.login_email = null;
      this.login_password = null;
      this.hasAccount = false;
    },
    goLogin:function(){
      // $('input[type=email]').css('background-color','transparent');
      $("#loginModal input.empty").removeClass('empty');
      $('#loginModal input').blur();
      this.signup_nickname = null;
      this.signup_email = null;
      this.signup_password = null;
      this.hasAccount = true;
      this.$broadcast('btnReset');   
    },
    ifEmpty:function(e,info){
      $(e.target).removeClass('empty');
      if(info.length>0){
        return;
      }
      $(e.target).addClass('empty');
    },
    signIn:function(e){
      if((!this.login_email)||(!this.login_password)){
        return;
      }
      var self = this;
      self.ref.authWithPassword({email:this.login_email,password:this.login_password},
        function(err,data){
          if(err == null){
            console.log("auth success!");
            // self.$broadcast('signupResult',e,true);
            self.uid = data.auth;
            $('#loginModal').closeModal();
            localStorage.removeItem('lightodo-cards');
            localStorage.removeItem('lightodo-sort');
            localStorage.removeItem('lightodo-time');
            localStorage.removeItem('lightodo-now');
            localStorage.removeItem('lightodo-reminder');
            localStorage.removeItem('lightodo-quote');
          } else {
            console.log("auth failed,msg:",err);
            self.$broadcast('signupResult',e,false);
          }
        }
      );
    },
    signUp:function(e){
      if((!this.signup_nickname)||(!this.signup_email)||(!this.signup_password)){
        return;
      }
      var self = this;
      self.ref.createUser({email:self.signup_email,password:self.signup_password},
        function(err,data){
          if(err!=null){
            console.log('注册失败');
            self.$broadcast('signupResult',e,false); 
          } else {
            self.$broadcast('signupResult',e,true); 
            console.log('注册成功');
            console.log(data);
            var user = data.uid;
            // .replace('simplelogin:','');
            var userRef = self.ref.child(user);
            userRef.set({nickname:self.signup_nickname});
          }
      });
    },
    signOut:function(){
      // wdsync.unauth();
      this.ref.unauth();
      this.loggedIn = false;
      this.uid = null;
      this.ifClicked = false;
      this.$dispatch('clearCardsF');
    },
    clicked:function(){
      this.ifClicked = this.ifClicked == true?false:true;
    },
    userInfo:function(val){
      var self = this;
      if(val){
        self.userRef.once('value',function(data){
          self.nickname =  (data.val()['nickname'] == null)?null:data.val()['nickname'];
          self.now = (data.val()['now'] == null)?null:data.val()['now'];
          console.log("self.now:"+self.now);
          self.reminder =  (data.val()['reminder'] == null)?null:data.val()['reminder'];
          self.time =  (data.val()['time'] == null)?true:data.val()['time'];
          self.quote =  (data.val()['quote'] == null)?"If you lose, don't lose the lesson.":data.val()['quote'];
          var cards =  (data.val()['cards'] == null)?[]:data.val()['cards'];
          var sort =  (data.val()['sort'] == null)?true:data.val()['sort'];
          self.$dispatch('userLoggedF',{cards:cards,sort:sort,loggedin:true});
          self.canUpdate = true;
          
        });
      }else{
        self.now = lightodoStorage.nrStorage.fetch('lightodo-now');
        self.reminder = lightodoStorage.nrStorage.fetch('lightodo-reminder');
        self.time = lightodoStorage.timeStorage.fetch();
        self.quote = lightodoStorage.quoteStorage.fetch();
        // self.$dispatch('userLoggedF',{cards:[],sort:true,loggedin:false});
        // self.$dispatch('stopLoading');
        console.log(self.uid,self.userRef);
      }
      
    },
    startLoadingS:function(){
      this.$dispatch('startLoading');
    },
    stopLoadingS:function(){
      this.$dispatch('stopLoading');
    }
  },
  components:{
    dateTime,
    quote,
    signup
  },
  watch:{
    'now':function(val){
      if(this.canUpdate){
        console.log(this.canUpdate,val);
        wdsync.updateData({'now':val});
      }else{
        lightodoStorage.nrStorage.save('lightodo-now',val);
      }
    },
    'reminder':function(val){
      // console.log('watch reminder update');
      if(this.canUpdate){
        // console.log('watch reminder update');
        wdsync.updateData({'reminder':val});
      }else{
        lightodoStorage.nrStorage.save('lightodo-reminder',val);
      }
    }
    // 'loggedIn':function(val){
    //   if(val){
    //     this.startLoadingS();
    //   }
    // }
  },
  directives:{
    isuser:function(val){
      // if(!val.loggedIn){
      //   val.fnload();
      // }
      if(localStorage.getItem('wilddog:session::lightodo')){
        val.fnload();
      }
      val.fn(val.loggedIn);
    }
  }
}
</script>

<style>
div{
  font-family: "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
header{
  padding-top: 10px;
}
.row .col{
  margin: 7px 0 0;
}
header .tool{
  display: inline-block;
}
.tool.search i{
  color: #f15e0c;
}
.tool.setting i{
  color: #eb008b;
}

/*login/sign up*/
/*button*/
.login-button {
    width: 96px;
    height: 96px;
    line-height: 22px;
}
.login-button>i {
    position: relative;
    bottom: 2px;
    right: 0;
    color: #eb008b;
    font-size: 1.8rem;
}
.waves-effect.waves-purple-lightodo .waves-ripple {
     /* The alpha value allows the text and background color
     of the button to still show through. */
      background-color:rgba(235,0,139,.65);
}
.waves-effect.waves-orange-lightodo .waves-ripple {
     /* The alpha value allows the text and background color
     of the button to still show through. */
      background-color:rgba(241,94,12,.65);
}
.waves-effect.waves-green-lightodo .waves-ripple{
      background-color:rgba(18,197,162,.65)}
/*modal*/
#loginModal.modal {
    max-height: 100%;
}
#loginModal.card {
    max-width: 560px;
}
#loginModal.overflow-visible {
    overflow-y: visible;
    overflow-x: visible;
}
.modal-close-button-mobile>i {
    font-size: 2.6rem;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #f15e0c;
}
.modal-close-button {
    position: absolute;
    top: -26px;
    right: -26px;
    z-index: 1000000000;
}
.modal-close-button>i {
    color: #f15e0c;
}
.form-input, .form-title {
    font-size: 1.8rem;
    font-weight: 300;
}
.form-title {
    margin-top: 10px;
    margin-bottom: 10px;
}
.font-green {
    color: #12c5a2;
}
.default-separator {
    border-bottom: 1px solid rgba(160,160,160,.5);
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 20px;
}
.form-button {
    font-size: 1.4rem;
    border-radius: 50px;
    margin-bottom: 10px;
}
.form-input label {
    font-size: 1.3rem;
    left: 1rem;
}
.form-input input{
  margin: 0 0 10px;
  padding: 0 0 5px;
  font-size: 1.5rem;
}
.font-purple {
  color: #eb008b;
}
.margin-sm {
    margin-top: 10px;
    margin-bottom: 10px;
}
.signin-login-button {
    width: 200px;
    font-size: 1.4rem;
}
.signinbtn{
  display: block;
  height: 60px;
  padding: 0;
  width: 120px;
  background: #fff !important;
  margin: auto;
  /*border: 2px solid #1ECD97;*/
  font-size: 18px;
  color: #1ECD97;
  cursor: pointer;
  outline: none;
  text-align: center;
  
}
.signinbtn span{
  text-transform: uppercase;
  line-height: 60px;
}
.signupbtn.success:before{
  content: '';
  position: absolute;
  z-index: 0;
  border: 2px solid #5a5a5a;
  border-radius: 1px;
  margin-top: 2px;
  transition: .2s;
  top: 20%;
  left: 40%;
  width: 12px;
  height: 22px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid #26a69a;
  border-bottom: 2px solid #26a69a;
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
/*input[type='email']{
  background-color: transparent !important;
}*/
.btn-rnd {
    border-radius: 30px;
    text-transform: none;
}
.font-grey {
    color: #7f7f7f;
}
/*after user login*/
.userrow{
  margin-bottom: -13px;
}
.user p{
  margin-top: 5px;
}
.showNickname{
  /*padding:  0 ;*/
  font-size: 18px;
  color: #EC407A;
}
.rusure{
  color: #F44336;
}
.logout{
  padding-left: 5px;
  font-size: 14px;
  cursor: pointer;
  color: #BDBDBD;
  transition: color 0.2s ease-out;
}
.logout:hover{
  color: #12c5a2;
}
.form-input input.empty{
    border-bottom: 1px solid #F44336;
    box-shadow: 0 1px 0 0 #F44336;
}
.nickpic{
    display: inline-block;
    width: 96px;
    height: 96px;
    background-color: #EC407A;
}
.nickletter{
    font-size: 4rem;
    color: #fff;
    line-height: 1.6;
}

/*解决 autofill 黄色背景的问题,但会导致 input box-shadow 样式受到影响，最终只能采取 autocomplete="off" 的方式*/
/*input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #fafafa inset !important;
}*/

/* 必需 */
.fade-transition {
  transition: all .3s ease;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.fade-enter, .fade-leave {
  opacity: 0;
}
[v-cloak] {
  display: none;
}
</style>
