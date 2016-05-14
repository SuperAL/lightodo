<template>
  <div id="card">
    <div class="col s12 m6 l3" v-show="!deleted">
      <div class="card white" >
        <i class="mdi mdi-menu right grey-text text-lighten-1 sortBtn"
        @mousedown='cardsortTrue'    
        v-show='sortactive'></i>
        <i class="mdi mdi-close right grey-text text-lighten-1 closeBtn"
        v-show='closeactive'
        @click='removeCard(card)'
        ></i>
        <span @dblclick="editTitle(card)" class="card-title" :class="{ editting: editedTitle }">{{ card.name }}</span>
        <div :class="{ editting: !editedTitle }" class="input-field">
          <input  
          type="text" 
          v-model="card.name"
          v-title-focus="card == editedTitle"
          @blur="doneEdit(card)"
          @keyup.enter="doneEdit(card)" 
          @keyup.esc="cancelEdit(card)"
          >
        </div>
        <div class="divider"></div>
        <section v-cloak>
          <ul class="todo-list" v-todo-sortable="enableSortable" draggable='false' @drop='drop($event)'>
            <li class="todo" 
            @dragstart='dragstart($event)' 
            @dragend='dragend($event)'
              v-for="todo in card.todos"
              v-notice="{setReminder:todo.setReminder,title:todo.title,time:todo.reminderTime,fn:showNotice,completed:todo.completed}"
              :class="{completed: todo.completed, editing: todo == editedTodo}">
              <div class="view grey-text" >
                <input type="checkbox" v-model="todo.completed" 
                :id="todo.id">
                <label :for="todo.id" class="hideLabel"></label>
                <i class="mdi mdi-alarm grey-text text-lighten-1 tiny" 
                :class='{reminder:todo.setReminder}'
                data-position='top' data-delay='50' data-tooltip=""
                @click='modalShow(todo)'
                ></i>
                <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                <a class="destroy center" @click="removeTodo(todo)"></a>
              </div>
              <input class="edit" type="text"
                v-model="todo.title"
                v-title-focus="todo == editedTodo"
                @blur="doneEditTodo(todo)"
                @keyup.enter="doneEditTodo(todo)"
                @keyup.esc="cancelEditTodo(todo)">
              <input type="hidden" class="clearNum" value=""></input>
              <a class="clear center" v-show="todo.title" 
              @mouseover="this.clearTodoClick=true"
              @mouseout="this.clearTodoClick=false"
              @click="clearTodo(todo,$event)"></a>
            </li>
          </ul>
        </section>
        <div class="action col s12">
          <div class="addTodo col s10">
            <input class="new-todo"
              autofocus autocomplete="off"
              placeholder="需要做什么呢？"
              v-model="newTodo"
              @keyup.enter="addTodo">
          </div>
          <!-- What needs to be done? -->
          <div class="clearCompleted col s2 valign-wrapper grey-text text-lighten-1">
            <i @click="removeCompleted" class="mdi mdi-delete tsbetween"></i>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
var Vue = require('vue');
var Notify =require('notifyjs');
var swal = require('sweetalert');
export default {
  data () {   
    return {
      // 是否显示 display:none
      editting: false,
      // 是否存在正在编辑的卡片名字
      editedTitle: null,
      editedTodo: null,
      clearTodoClick:false,
      // todos:[]
      newTodo: '',
      enableSortable:true,
      oldIndex:null,
      newIndex:null,
      cardsort:false,
      deleted:false
    }
  },
  props:['card','sortactive','closeactive'],
  methods:{
    editTitle:function(card){
      this.beforeEditCache = card.name;
      this.editedTitle = card;
    },

    doneEdit: function (card) {
      if (!this.editedTitle) {
        return;
      }
      this.editedTitle = null;
      if (!card.name){
        card.name = this.beforeEditCache;
        return;
      }    
      card.name = card.name.trim();
    },
    cancelEdit: function (card) {
      this.editedTitle = null;
      card.name = this.beforeEditCache;
    },

    addTodo: function () {
      console.log(this.card.todos);
      if(!this.card.todos){
        // this.card.todos = [];
        this.$set('card.todos', []);
      }
      var id = this.card.id +'-'+ this.card.todos.length;
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      console.log(id);
      this.card.todos.push({ id: id,title: value, completed: false,setReminder:false,clear:null});
      console.log('push');
      this.newTodo = '';
      this.justAdd = true;
    },

    removeTodo: function (todo) {
      todo.setReminder = false;
      this.card.todos.$remove(todo);
      // if(!this.card.todos){
      //   this.card.todos = [];
      // }
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    clearTodo:function(todo,e){
      console.log('clear');
      todo.title = '';
      $(e.target).siblings('.edit').focus();
      console.log($(e.target).siblings('.edit'));
      this.clearTodoClick = false;
    },
    doneEditTodo: function (todo) {
      console.log('blur');
      if (!this.editedTodo||this.clearTodoClick) {
        this.clearTodoClick = false;
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEditTodo: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    removeCompleted: function () {
      this.card.todos = this.active(this.card.todos);
    },
    dragstart:function(e){

      // this.oldIndex = $(e.target).index();
      // var draggedtodo = this.card.todos.slice(this.oldIndex,this.oldIndex)[0];
      // this.$dispatch('transferTodo',draggedtodo);
      // var draggedtodo = this.card.todos.slice(this.oldIndex,this.oldIndex)[0];
      // this.$dispatch('transferTodo',draggedtodo);
    },
    dragend:function(e){
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
    },
    drop:function(e){
      console.log("cardsort:"+this.cardsort);
      if(this.cardsort){
        this.cardsort = false;
        return;
      }
      var cardid = $(e.target).parents('.cardpiece').attr('id');
      var newIndex = $('.sortable-ghost').index();
      console.log(e.target);
      var todoidFind = $(e.target).find('.todo.sortable-ghost input').attr('id') ||  $(e.target).find('input').attr('id') || $(e.target).siblings('input').attr('id') || $(e.target).attr('for');
      var todoid = todoidFind.split('-');
      console.log(todoid);
      // var todoid = $(e.target).find('input').attr('id').split('-');
      if(cardid!=todoid[0]){
        this.$dispatch('transferTodo',todoid,cardid,newIndex);
      }else if(newIndex!=todoid[1]){
        var draggedTodo = this.card.todos.splice(todoid[1],1)[0];
        this.card.todos.splice(newIndex,0,draggedTodo);
      }
      console.log('drop');       
    },
    // carddragstart:function(e){
    //   console.log('carddragstart');
    //   this.cardsort = true;
    // },
    // carddragend:function(){
    //   console.log('carddragend');
    //   this.cardsort = false;
    // },
    removeCard: function (card) {
      if(card.todos){
        var len = card.todos.length;
        for(var i =0;i<len;i++){
          if(card.todos[i].setReminder&&(!card.todos[i].completed)){
            swal("注意", "当无进行中的提醒任务时方可删除卡片");
            // alert('you can not delete this card until you cancel all the alerts!');
            return;
          }
        }
      }
      console.log("removeCard:"+card.id);
      this.deleted = true;
      this.$dispatch('deleteCard', card);
      
    },
    cardsortTrue:function(){
      console.log('onmousedown');
      this.cardsort = true;
    },
    modalShow:function(todo){
      if(todo.completed){
        return;
      }
      // if(todo.reminderTime){
      //   var reminderTime = todo.reminderTime;
      //   delete todo.reminderTime;
      // }
      
      this.$dispatch('modalShowPicker',todo);
    },
    showNotice:function(time,title){
      console.log('showNotice');
      function onPermissionGranted (time,title) {
          console.log('Permission has been granted by the user');
          doNotification(time,title);
      }
      function onPermissionDenied (time,title) {
          console.warn('Permission has been denied by the user');
          // alert(time);
          alertNotification(time,title);
      }
      function doNotification (time,title) {
          var myNotification = new Notify('提醒 '+time, {
              body: title,
              tag: title
          });
          myNotification.show();
      }
      function alertNotification(time,title){
        if($('.sweet-alert').css('display')=='none'||$('.sweet-alert').length == 0){
          swal({title:'提醒', text:'<h5 style="color:#f15e0c">'+time+'<h5/><p>'+title+'</p>',html:true});
        }else{
           $('.sweet-alert>p').append('<h5 style="color:#f15e0c">'+time+'<h5/><p>'+title+'</p>');
        }
        
      }
      if (!Notify.needsPermission) {
          doNotification(time,title);
      } else if (Notify.isSupported()) {
          Notify.requestPermission(onPermissionGranted(time,title), onPermissionDenied(time,title));
      } else{
        // alert(time);
        alertNotification(time,title);
      }
    }
  },
  watch: {
    // 'draggedtodo':function(val, oldVal){
    //   console.log(val);
    //   if(!val){
    //     return;
    //   }
    //   console.log(val);
    //   if(this.oldIndex){
    //     this.card.todos.splice(this.oldIndex,1);
    //     this.oldIndex = null;
    //   }
    //   if(this.newIndex){
    //     this.card.todos.splice(this.newIndex,0,val);
    //     this.newIndex = null;
    //   }
    // },
    // 'draggedtodo':{
    //     handler: function(val, oldVal){
    //   console.log(val);
    //   if(!val){
    //     return;
    //   }
    //   console.log(val);
    //   if(this.oldIndex){
    //     this.card.todos.splice(this.oldIndex,1);
    //     this.oldIndex = null;
    //   }
    //   if(this.newIndex){
    //     this.card.todos.splice(this.newIndex,0,val);
    //     this.newIndex = null;
    //   }
    // },
    //     deep: true
    //   },
    'card.id': function (val) {       
        console.log('id-'+val);
        console.log(this.card.id);
        if(this.card.todos){
          var i = this.card.todos.length;
          while (i--) {
              var todoid = this.card.todos[i].id.split('-');
              todoid[0] = val;
              this.card.todos[i].id = todoid.join('-');  
          }
        }
        
    },
    'card.todos': function(val){

      console.log('card todos watch');
      // while 循环
      if(this.justAdd){
        this.justAdd = false;
        return;
      }
      var i = val.length;
      var cardid = this.card.id;
      console.log('cardid:'+cardid);
      while (i--) {
          var todoid = val[i].id.split('-');
          todoid[0] = cardid;
          todoid[1] = i;
          val[i].id = todoid.join('-');  
      }
    }
  },
  directives: {
      'title-focus': function (value) {
        if (!value) {
          return;
        }
        var el = this.el;
        Vue.nextTick(function (){
          el.focus();
        });
      },
      'todo-sortable': function (value){
        console.log(value);
        if (!value) {
          return;
        }
        var el = this.el;
        Vue.nextTick(function () {
          sortable.todosSortable(el);
        });

      },
      'notice':function(value){
        console.log('notice show');
        var tooltipClass = this.el.querySelector('.mdi-alarm');

        
        if (!value.setReminder) {
          $(tooltipClass).tooltip('remove');
          clearTimeout(this.el.querySelector('.clearNum').value);
          return;
        }else{
          this.el.querySelector('.mdi-alarm').dataset.tooltip = value.time;
          console.log('value time:'+value.time);
          // if(!$(tooltipClass).hasClass('tooltipped')){
          //     $(tooltipClass).addClass('tooltipped');
          // }
          $(tooltipClass).tooltip({delay: 50});
        }
        if(value.completed){
          console.log('clear num:'+this.el.querySelector('.clearNum').value);
          clearTimeout(this.el.querySelector('.clearNum').value);
          $(tooltipClass).addClass('reminderStopped');
          return;
        }else if($(tooltipClass).hasClass('reminderStopped')){
          $(tooltipClass).removeClass('reminderStopped');
        }

        console.log("notice:"+value.title);
        var now = new Date().getTime();
        console.log("now:"+now);
        console.log("value.time:"+value.time);
        var future = Date.parse(value.time.replace(/-/g,'/'));
        console.log("future:"+future);
        var interval = future - now;
        console.log("interval:"+interval);
        if(interval>0){
          var clear = setTimeout(function(){
            value.fn(value.time,value.title)
          },interval);
          this.el.querySelector('.clearNum').value = clear;
        }else{
          value.fn(value.time,value.title);
        }
      }
    }
    // events:{
    //   'remove-todo':function(){
    //     console.log('removeTodoe',this.oldIndex);
    //     if(this.oldIndex===null){
    //       return true;
    //     }
    //     console.log('removeTodoe');
    //     this.card.todos.splice(this.oldIndex,1);
    //     this.oldIndex = null;
    //     return;
    //   },
    //   'add-todo':function(val){
    //     console.log('addTodoe');
    //     if(this.newIndex===null){
    //       return true;
    //     }
    //     console.log('addTodoe',this.newIndex);
    //     this.card.todos.splice(this.newIndex,0,val);
    //     this.newIndex = null;
    //     return;
    //   }
    // }
}



</script>

<style>
.card {
  min-height: 300px;
  /*font-family: "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;*/
}
.card-title{
  font-size: 20px;
  color: #eb008b;
  padding: 15px;
  display: inline-block;  
  cursor: default;
}
.editting{
  display: none;
}
.card .input-field{
    margin-top: 0;
    padding: 5px 15px 0;
}
.action{
  position: absolute;
  left: 0;
  bottom: 0;
}
section{
  padding-bottom: 60px;
}
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  min-height: 160px;
}
.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  padding: 0 40px 0 10px;
  cursor: move;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;

}
.todo-list li label {
  /*white-space: pre;*/
  word-break: break-word;
  transition: color 0.2s;
}
.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
.todo-list li .edit,.todo-list li .clear {
  display: none;
}
.todo-list li.editing .edit {
  display: block;
  margin-bottom: 0;
  height: 35px;
  font-size: 12px;
}
.todo-list li.editing .clear{
  display: block;
}
.todo-list li .clear{
  position: absolute;
  top: 0;
  right: 10%;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #ddd;
  transition: color 0.2s ease-out;
  cursor: pointer;
}
.todo-list li .clear:hover{
  color:#bdbdbd;
}
.todo-list li.editing .view {
  display: none;
}
.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 5%;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #bdbdbd;
  transition: color 0.2s ease-out;
  cursor: pointer;
}
.todo-list li .destroy:hover {
  color: #f15e0c;
}

.todo-list li .destroy:after,.todo-list li .clear:after {
  content: '×';
}

.todo-list li:hover .destroy {
  display: block;
}

[type="checkbox"]+label.hideLabel{
  display: inline;
  padding-left: 25px;
}

/*clearCompleted*/
.clearCompleted{
  height: 60px;
}
.clearCompleted i{
  cursor: pointer;
  transition: color 0.2s;
}
.clearCompleted i:hover{  
  color: #f15e0c;
}

/*sortable*/
.sortable-ghost {
  background-color: #f9f9f9;
}

/*sortBtn,closeBtn*/
.sortBtn,.closeBtn{ 
  padding: 5px;
}
.sortBtn{
  cursor: move;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}
.closeBtn{
  cursor: pointer;
}
i.right {
  margin-left: 5px;
}

/*解决ghost不出现的问题*/
input[type='checkbox']{
  display: none;
}

/*解决ie下input出现clear btn的问题*/
::-ms-clear {
  display: none;
}

/*clock*/
i.mdi-alarm{
  cursor: pointer;
}
i.mdi-alarm.reminder{
  color: #F15E0C !important;
}
i.mdi-alarm.reminderStopped{
  color: #12C5A2 !important;
}
[v-cloak] {
  display: none;
}
</style>


