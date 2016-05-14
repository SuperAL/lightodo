<template>
  <div id="app">
    <div v-show="loading" class="mask" transition="fade"></div>
    <div v-show="loading" class="load" ></div>
    <app-header></app-header>
    <app-content :loading.sync="loading"></app-content>
    <!-- <signup></signup> -->
  </div>
</template>

<script>
import appHeader from './app-header.vue'
import appContent from './app-content.vue'
// import signup from './signup.vue'

export default {
  data () {
    return {
      loading:false
    }
  },
  components:{
    appHeader,
    appContent
    // signup
  },
  events:{
    userLoggedF:function(val){
      console.log('broadcast userLoggedS');
      console.log(val);
      this.$broadcast('userLoggedS',val);
      // this.loading = false;
      console.log('broadcast userLoggedS fin');
    },
    startLoading:function(){
      console.log('start loading');
      this.loading = true;
    },
    stopLoading:function(){
      console.log('stop loading');
      this.loading = false;
    },
    clearCardsF:function(){
      this.$broadcast('clearCardsS');
    }
  }

}
</script>

<style>
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
#app{
  position: relative;
}
/* 必需 */
.fade-transition {
  transition: all .3s ease;
  /*font-size: 14px;*/
}
.mask{
  position: absolute;
  z-index: 9999;
  width: 100%;    
  height: 100vh; 
  background-color: #fff;
  /*transition: all .3s ease;*/
}
.load {
  position: absolute;
  z-index: 10000;
  top: 50%;
  left: 50%;
  margin-left: -7px;
  width:15px;
  height:15px;
  background:rgba(0,0,0,0);
  border-radius:50%;
  margin:100px auto;
  -webkit-animation:load 3s ease-in-out infinite;
  animation:load 3s ease-in-out infinite;
}
@-webkit-keyframes load {
  0% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  8% {box-shadow:15px -15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  17% {box-shadow:15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  25% {box-shadow:15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  33% {box-shadow:-15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  42% {box-shadow:-15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  50% {box-shadow:-15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  58% {box-shadow:-15px 15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  67% {box-shadow:-15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  75% {box-shadow:-15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  83% {box-shadow:15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  92% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  100% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
}
@keyframes load {
  0% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  8% {box-shadow:15px -15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  17% {box-shadow:15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
  25% {box-shadow:15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  33% {box-shadow:-15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  42% {box-shadow:-15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, -15px 15px 0 0 #EC407A;}
  50% {box-shadow:-15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  58% {box-shadow:-15px 15px 0 0 #EC407A, 15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  67% {box-shadow:-15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px 15px 0 0 #EC407A;}
  75% {box-shadow:-15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  83% {box-shadow:15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  92% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, 15px -15px 0 0 #EC407A;}
  100% {box-shadow:15px 15px 0 0 #EC407A, -15px 15px 0 0 #EC407A, -15px -15px 0 0 #EC407A;}
}
</style>
