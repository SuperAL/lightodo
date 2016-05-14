<template>
  <div id="dateTime">
    <div class="tool time" v-ifshow="{isactive:isactive,fn:showDatetime}">
      <span class="flow-text hide-on-med-and-down" v-show='isactive'>{{ date }}</span>
      <span class="flow-text " v-show='isactive'>{{ week }}</span>
      <span class="flow-text" v-show='isactive'>{{ time }}</span>
      <i class="mdi mdi-calendar-clock right small waves-effect waves-light"
      :class="{'active':isactive}"
      @click='activeOrNot'></i>
      <!-- data-position='left' data-delay='50' data-tooltip="Click To Toggle" -->
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      date:'',
      week:'',
      time:'',
      // isActive:lightodoStorage.timeStorage.fetch(),
      clearTime:null
    }
  },
  props:['isactive','loggedin'],
  methods:{
    activeOrNot:function(){
      this.isactive = this.isactive ? false : true;
    },
    showDatetime:function(isactive){
      var self = this;
      console.log("self.date:"+self.date);
      // self.isactive = self.isactive ? false : true;
      if(isactive){
        self.date = datetime.getActiveDateString();   
        self.week = datetime.getWeekday();
        self.time = datetime.getTimeString(); 
        var seconds = (60 - datetime.getSeconds())*1000;  
        console.log(seconds);
        this.clearTime = setTimeout(function(){
          self.time = datetime.getTimeString();
          if(self.time == '00:00'){
            self.date = datetime.getActiveDateString();   
            self.week = datetime.getWeekday();
          }
          this.clearTime = setInterval(function(){
            self.time = datetime.getTimeString();
            console.log('self.time:'+self.time);
            if(self.time == '00:00'){
              self.date = datetime.getActiveDateString();
              self.week = datetime.getWeekday();
            }
          },60000);
          console.log('this.clearTime:'+this.clearTime)
        },seconds); 

      }else{
        console.log('this.clearTime:'+this.clearTime)
        clearTimeout(this.clearTime);
        clearInterval(this.clearTime);
      }
      console.log(datetime.getTimeString(),datetime.getActiveDateString());
    }    
  },
  directives:{
    ifshow:function(val){
      val.fn(val.isactive);
    }
  },
  watch:{
    isactive:function(val){
      if(this.loggedin){
        // console.log('watch reminder update');
        wdsync.updateData({'time':val});
      }else{
        lightodoStorage.timeStorage.save(val);
      }
      
    }
  }

}

</script>

<style>
.tool.time i{
  cursor: pointer;
  color: #bdbdbd;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: color;
  transition-property: color;
}
.tool.time i:hover{
  color: #12c5a2;
}
.tool.time i.active{
  color: #12c5a2;
}
.tool.time span {
  /*font-weight: bold;*/
  padding-right: 5px;
  color: #12c5a2;
  /*font-size: 16px;*/
  line-height: 30px;
}
</style>


