<template>
  <div id="app-content" class="container">
    <div class="row">
      <div class="col s12">
        <div class="btns right z-depth-1">
          <a class="waves-effect waves-teal btn-flat"
          style="border-top-right-radius: 0;border-bottom-right-radius: 0;"
          :class="{ 'active':sortActive}" 
          @click="sortTrue">排序<i class="mdi mdi-menu right"></i></a><a class="waves-effect waves-teal btn-flat" 
          style="border-top-left-radius: 0;border-bottom-left-radius: 0;"
          :class="{ 'active':!sortActive}" 
          @click="closeTrue">删除<i class="mdi mdi-close right"></i></a>
        </div>
      </div>      
    </div>
    <div class="row" id="cards" >
      <div v-show="cards.length" v-card-sortable="sortActive" >
        <card  v-for="card in cards" v-cloak
        v-if='card'  
        :card="card" 
        :sortactive='sortActive' 
        :closeactive='!sortActive'
        :id='card.id' 
        @dragstart='cardDragstart($event)' 
        @dragend='cardDragend($event)'
        class="cardpiece"></card>
      </div>
      <new-card></new-card>
    </div>
    <!-- Modal Structure -->
    <div id="modal" class="modal modal-time overflow-visible">
      <div class="modal-close-button-mobile modal-close right-align">
        <i class="mdi mdi-close"></i>
      </div>
      <div class="modal-content">
        <h4>添加提醒</h4>       
        <label for="dtp_input" class="col-md-2 control-label">选择时间</label>
        <!-- form_datetime input-field-->
        <div id="datepicker" class="input-group date  form_datetime row input-field"  data-date-format="yyyy-mm-dd hh:ii" data-link-field="dtp_input" data-link-format="yyyy-mm-dd hh:ii">
          <input class="form-control col s12" size="16" type="text" v-model="modalReminder" readonly>
          <span class="input-group-addon col s2"><i class="glyphicon glyphicon-th mdi mdi-calendar small"></i></span>
          <!-- <span class="input-group-addon col s2"><i class="glyphicon glyphicon-remove mdi mdi-close small"></i></span> -->
        </div>
        <input type="hidden" id="dtp_input" v-model="modalReminder"/><br/>   
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect btn left" style="margin-left: 10px;"
        v-show="showCancel"
        @click="cancelReminder">关闭提醒</a>
        <a href="#!" class="modal-action modal-close waves-effect btn">取消</a>
        <a href="#!" id="confirmTime" class="modal-action waves-effect btn" 
        :class="{disabled:modalReminder == null||modalReminder == false}"
        @click="remindTimeConfirm"
        >确定</a>
        <!-- @click="remindTimeConfirm" -->
      </div>
    </div>

  </div>
</template>

<script>
import newCard from './new-card.vue'
import card from './card.vue'
var Vue = require('vue');
// var Notify =require('notifyjs');
// var masonry = require('masonry-layout');
export default {
  data () {
    return {
      // {id:id,name:name,todos:[]}
      cards: lightodoStorage.todoStorage.fetch(),
      sortActive:lightodoStorage.sortStorage.fetch(),
      loggedin:false,
      // closeActive:!this.sortActive,
      cardsort:false,
      justAdd:false,
      ifSorted:false,
      modalTodoRef:null,
      showCancel:false,
      modalReminder:null
      // reminders:lightodoStorage.reminderStorage.fetch()
    }
  },
  props:['loading'],
  methods:{
    readout:function(a){
      console.log(a==null);
      console.log(a==false);
    },
    sortTrue:function(){
      this.sortActive = true;
      this.closeActive = false;
      // window.location.reload(false);
    },
    closeTrue:function(){
      this.closeActive = true;
      this.sortActive = false;
      // if(this.ifSorted){
      //   window.location.reload(false);
      // }     
    },
    cardDragstart:function(e){
      if($(e.target).hasClass('todo')){
        return;
      }
      this.cardsort = true;
      console.log('cardDragstart');
      // this.cardsort = true;
      this.target = $(e.target);
      this.oldIndex = this.target.index();
      console.log(e.target,this.oldIndex);    
      // var draggedtodo = this.card.todos.slice(this.oldIndex,this.oldIndex)[0];
      // this.$dispatch('transferTodo',draggedtodo);
      // var draggedtodo = this.card.todos.slice(this.oldIndex,this.oldIndex)[0];
      // this.$dispatch('transferTodo',draggedtodo);
    },
    cardDragend:function(e){
      if(!this.cardsort){
        return;
      }
      console.log('cardDragend');
      this.newIndex = this.target.index();
      console.log(e.target,this.newIndex);
      if(this.oldIndex == this.newIndex){
        return;
      }
      var draggedCard = this.cards.splice(this.oldIndex,1)[0];
      this.cards.splice(this.newIndex,0,draggedCard);
      console.log('cards drag and drop');
      

      this.ifSorted = true;

      // 传到子组件，用于禁止 ul 清单的drop事件
      // this.cardSort = false;

      this.$nextTick(function(){
        var i = this.cards.length;
        console.log('cards length:'+i);
        while (i--) {
            this.cards[i].id = i;
        }
      }) 

      // var draggedtodo = this.card.todos.slice(this.oldIndex,this.oldIndex)[0];
      // this.$dispatch('transferTodo',draggedtodo);
      // this.card.todos.splice(this.oldIndex,1);
      // var draggedTodo = this.card.todos.splice(this.oldIndex,1)[0];
      // this.card.todos.splice(this.newIndex,0,draggedTodo);

      // if(this.cardIndex == cardIndexAfter){       
      //   var draggedTodo = this.card.todos.splice(this.oldIndex,1)[0];
      //   this.card.todos.splice(this.newIndex,0,draggedTodo);
      // }else{

      // }    
      this.cardsort = false;   
      // 每次对卡片进行排序都重新刷新页面
      window.location.reload(false);  
    },
    // removeDeleted: function () {
    //   var len = this.reminders.length;
    //   for(var i=0;i<len;i++){
    //     if(this.reminders[i].todoRef.setReminder == false){
    //       this.reminders.splice(i,1);
    //       return;
    //     }
    //   }
    // },
    remindTimeConfirm:function(){
      console.log('remindTimeConfirm');
      // this.modalTodoRef --->  todo
      if(!this.modalReminder){
        return;
      }
      $('#modal').closeModal();
      if(!this.modalTodoRef.setReminder){
        this.modalTodoRef.setReminder = true;
        // this.reminders.push({'todoRef':this.modalTodoRef});
      }  
      console.log("this.modalTodoRef.reminderTime:"+this.modalTodoRef.reminderTime);
      if(this.modalTodoRef.reminderTime !== this.modalReminder){
        console.log('update reminder time');
        console.log("remindTimeConfirm:"+this.modalReminder);
        this.modalTodoRef.reminderTime = this.modalReminder;
        // lightodoStorage.todoStorage.save(this.cards);
        // lightodoStorage.reminderStorage.save(this.reminders);
      }
      // console.log(this.modalTodoRef.reminderTime);
      console.log(this.modalReminder);
    },
    cancelReminder:function(){
      this.modalTodoRef.setReminder = false;
      this.modalTodoRef.reminderTime = null;
      // this.removeDeleted();
    }
    // showNotice:function(time,title){
    //   function onPermissionGranted () {
    //       console.log('Permission has been granted by the user');
    //       doNotification();
    //   }
    //   function onPermissionDenied () {
    //       console.warn('Permission has been denied by the user');
    //   }
    //   function doNotification (time,title) {
    //       var myNotification = new Notify('提醒 '+time, {
    //           body: title,
    //           tag: 'My unique id',
    //           closeOnClick: true
    //       });
    //       myNotification.show();
    //   }
    //   if (!Notify.needsPermission) {
    //       doNotification();
    //   } else if (Notify.isSupported()) {
    //       Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    //   }    
    // }
  },
  components:{
    newCard,
    card
  },
  watch: {
    // 'cards':function(val){
    //   console.log('cards not deep:'+val);
    //   // while 循环
    //   if(this.justAdd){
    //     this.justAdd = false;
    //     return;
    //   }
    //   var i = val.length;
    //   // var cardid = this.card.id;
    //   // console.log('cardid:'+cardid);
    //   while (i--) {
    //       val[i].id = i;  
    //   }
    //   // if(this.justAdd){
    //   //   this.justAdd = false;
    //   //   return;
    //   // }
    //   // var i = val.length;
    //   // while (i--) {
    //   //     val[i].id = i;
    //   // }
    // },

    'cards': {
        handler: function (cards) {
          console.log('cards deep'+cards);
          if(this.loggedin){
            wdsync.updateData({'cards':cards});
          }else{ 
            lightodoStorage.todoStorage.save(cards);
          }
        },
        deep: true
      },
    'sortActive': function(val){
      if(this.loggedin){
        wdsync.updateData({'sort':val});
      }else{ 
        lightodoStorage.sortStorage.save(val);
      }
      
    }
    // 'reminders':{
    //   handler:function(val){
    //     console.log('reminders deep watch');
    //     lightodoStorage.reminderStorage.save(val);
    //   },
    //   deep:true
    // }
  },
  events:{
    insertCard:function(cardName){
      this.justAdd = true;

      // if(this.cards.length>0){
      //   var len = this.cards.length - 1 ;
      //   var id = (Number(this.cards[len]['id']) + 1);
      // }else{
      //   var id = 0;
      // }
      
      
      var id = this.cards.length;
      console.log('insertCard id:'+id);
      var name = cardName;
      this.cards.push({id:id,name:name,todos:[]});
    },
    transferTodo:function(todoid,cardid,newIndex){
      console.log('transferTodo');
      var draggedTodo = this.cards[todoid[0]].todos.splice(todoid[1],1)[0];
      // var newId = cardid + '-' +newIndex;
      // console.log(newId);
      // draggedTodo.id = newId;
      this.cards[cardid].todos.splice(newIndex,0,draggedTodo);
      console.log(newIndex);
    },
    deleteCard:function(card){
      // Vue.delete(this.cards);
      console.log('deleteCard:'+card.id);
      // this.cards.splice(card.id,1);
      this.cards.$remove(card);
      // var len = this.cards.length;
      // for(var i=0;i<len;i++){
      //   if(this.cards[i]['id'] == card.id){
      //     this.cards.$remove(card);
      //     // this.cards.splice(i,1);
      //     break;
      //   } 
      // }

      console.log('deleteCardleft:'+this.cards.length);

      this.$nextTick(function(){
        var len = this.cards.length;   
        console.log('cards length:'+len);
        for(var i=0;i<len;i++){
          console.log('change id:'+i);
          this.cards[i].id = i;
        } 
      }) 
    },
    modalShowPicker:function(todo){
      console.log('todo log:');
      console.log(todo);
      this.modalTodoRef = null;
      this.modalTodoRef = todo;
      console.log(todo.title);
      this.showCancel = todo.setReminder;
      if(this.modalTodoRef.setReminder){
        this.modalReminder = this.modalTodoRef.reminderTime;
        // this.modalReminder = reminderTime;
        this.modalTodoRef.setReminder = false;
        console.log("modalShowPicker:"+this.modalReminder);
      }else{
        this.modalReminder = null;
      }    
      $('#modal').openModal();
      console.log("this.modalTodoRef.setReminder:"+this.modalTodoRef.setReminder);           
      $('.form_datetime').datetimepicker({
          weekStart: 1,
          todayBtn:  1,
          autoclose: 1,
          todayHighlight: 1,
          startView: 2,
          forceParse: 0,
          // showMeridian: 1,
          useCurrent:1
      });

      // 绑定 确定 按钮
      // $('#confirmTime').on('click',this.remindTimeConfirm(todo));
    },
    userLoggedS:function(val){
      this.cards = val.cards;
      this.sortActive = val.sort;
      this.loggedin = val.loggedin;
      console.log('data finished');
      this.$dispatch('stopLoading');
      // this.loading = false;
    },
    clearCardsS:function(){
      this.cards = [];
    }
  },
  directives:{
    'card-sortable':function(value){
      if (!value) {
        return;
      }

      var el = this.el;

      Vue.nextTick(function(){
        // var $container = $('#masonry-grid');
        // // initialize
        // $container.masonry({
        //   columnWidth: '.col',
        //   itemSelector: '.col',
        //   percentPosition: true
        // });

        // var el = document.getElementById('cards');
        sortable.cardsSortable(el);
        console.log('card sortable');           
      })
    }
  }
}
</script>

<style>
body {
  background-color: #f9f9f9;
}
.btns{
  text-decoration: none;
  background-color: #fff;
  text-align: center;
  letter-spacing: .5px;
  transition: .2s ease-out;
  cursor: pointer;
  border-radius: 2px;
}
.btn-flat{
  /*width: 85px;*/
  padding: 0 .4rem 0 .6rem;
}
.btn-flat.active{
  color: #fff;
  background-color: #12C5A2;
}
/*sortable*/
.sortable-chosen .card{
  box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  background-color: #fafafa !important; 
}

/*datetimepicker*/
.row .col.input-group-addon{
  padding: 6px 12px;
}
.glyphicon {
    display: inline-block;
    font: normal normal normal 24px/1 "Material Design Icons";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate(0, 0);
}
.glyphicon-arrow-left:before{
    content: "\F141";
}
.glyphicon-arrow-right:before{
    content: "\F142";
}
.form_datetime input{
  /*border:none;*/
}
.form_datetime .mdi{
  cursor: pointer;
}
.modal .modal-footer .btn{
  margin: 0 10px 0 0;
}
@media only screen and (max-width: 992px){
  .modal-time {
    width: 60%;
  }
}
.modal-time{
  width: 30%;
  min-width: 430px;
}
#modal.overflow-visible {
  overflow-y: visible;
  overflow-x: visible;
}

/*修改 时间选择插件 的样式*/
#datepicker.date .form-control{
  margin-left: 0;
  margin-right: 0;
  background-color: transparent;
  cursor: pointer;
}
#datepicker.date span.input-group-addon{
  visibility: hidden;
  padding: 0;
  margin: 0;
  width: 0;
  height: 0;
}
#datepicker.input-field {
     margin-top: 0;
     margin-bottom: 0; 
}
.modal-time .modal-close-button-mobile>i {
    color: #9F9F9F;
}
[v-cloak] {
  display: none;
}
</style>
