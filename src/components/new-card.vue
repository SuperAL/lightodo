<template>
  <div id="new-card">
    <div class="col s12 m6 l3">
      <div class="card small white  valign-wrapper">
        <div class="addcard center">
          <!-- "+" -->
          <i @click="clickPlus" v-show="!ifplusClicked" transition="fade" class="large mdi mdi-plus grey-text"></i>
          <!-- card name input -->
          <div class="input-field col s12" v-show="ifplusClicked" >
            <input @keyup.enter="newCard" id="card_name" type="text" v-model="cardName" v-name-focus="ifplusClicked" @blur="ifplusClicked=false" >
            <label for="card_name">卡片命名</label>
          </div> 

        </div>          
      </div>
    </div>
  </div>
</template>

<script>
var Vue = require('vue');

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      ifplusClicked:false,
      cardName:''
    }
  },
  methods:{
    clickPlus:function(){
      this.ifplusClicked = true;
    },
    newCard:function(){
      if(this.cardName.trim()){
        console.log(this.cardName);
        this.$dispatch("insertCard",this.cardName);
        this.cardName='';
        this.ifplusClicked = false;
        // 新建一个带有卡片名的todo清单
        // 置于new-card组件前面
        // new-card组件恢复加号
      }
    }
  },
  directives: {
    'name-focus': function (value) {
      if (!value) {
        return;
      }
      var el = this.el;
      Vue.nextTick(function () {
        el.focus();
      });
    }
  }
}



</script>

<style>
.addcard {
  width: 100%;
}
.addcard i{
  cursor: pointer;
}
.fade-enter{
  transition: all .1s ease;
}
.fade-leave{
  transition: all 0s ease;
}
</style>


