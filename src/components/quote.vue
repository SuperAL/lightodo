<template>
  <div id="quote">
    <div class="tool quote" :class='{"editQuote":editedQuote}' v-cloak>
      <p class="view tooltipped" @dblclick="editQuote(quote)" data-position='right' data-delay='50' data-tooltip="Double Click To Edit">“{{ quote }}”</p>
      <input class="edit" type="text"
            v-model="quote"
            @blur="doneEditQuote(quote)"
            @keyup.enter="doneEditQuote(quote)"
            @keyup.esc="cancelEditQuote">
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      // quote:lightodoStorage.quoteStorage.fetch(),
      editedQuote:false
    }
  },
  props:['quote','loggedin'],
  methods:{
       editQuote: function (quote) {
        console.log('double click');
         this.beforeEditCache = quote;
         this.editedQuote = true;
         this.$nextTick(function(){
          var el = document.querySelector('.quote .edit');
          el.focus();
         })
       },
       doneEditQuote: function (quote) {
         console.log('blur');
         this.editedQuote = false;
         this.quote = quote.trim();
         if (!this.quote) {
          this.quote = this.beforeEditCache;
         }
       },
       cancelEditQuote: function () {
         this.editedTodo = false;
         this.quote = this.beforeEditCache;
       }
  },
  watch:{
    'quote':function(val){
      if(this.loggedin){
        // console.log('watch reminder update');
        wdsync.updateData({'quote':val});
      }else{
        lightodoStorage.quoteStorage.save(val);
      }
      
    }
  }

}

</script>

<style>
.quote{
  width: 100%;
}
.quote .view{
  cursor: pointer;
  display: inline-block;
}
.quote.editQuote .view{
  display: none;
}
.quote .edit{
  display: none;
  margin: 0 0 6px 0;
}
.quote.editQuote .edit{
  display: block;
}
[v-cloak] {
  display: none;
}
</style>


