<template>
  <div class="wrap">
      <button type="submit" class="btn-large" :class="{disabled:disabled}" >Okay.</button>
      <span class="failtip" v-show='ifsuccess==false' transition="fade" v-text="failtip"></span>
      <!-- <img src="https://www.dropbox.com/s/qfu4871umzhlcfo/check_arrow_2.svg?dl=1" alt=""> -->
      <i class="mdi mdi-check" :class="{'mdi-check':ifsuccess==true,'mdi-close':ifsuccess==false,'shown':ifsuccess!==null}" ></i>
      <!-- v-show="ifsuccess!==null" -->
      <!-- <i class="mdi mdi-close" ></i> -->
      <!-- <svg width="66px" height="66px">
        <circle class="circle_2" stroke-position="outside" stroke-width="3" fill="none" cx="34" cy="33" r="29" stroke="#1ECD97"></circle>
      </svg> -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      // timer : null,
      // clicked : false,
      ifsuccess: null
    }
  },
  props:['disabled','failtip'],
  methods:{
    resetBtn:function(){
      // this.timer = null;
      // this.clicked = false;
      if(this.ifsuccess == null){
        return;
      }
      this.ifsuccess= null;
      $('.wrap button').text('Okay.');
      $('.wrap button').attr("class", "btn-large");
      // $('.wrap button').attr("class", "btn-large");
      // $('.wrap .circle_2').removeClass('fill_circle');
      // var el     = $('.wrap .circle_2'),  
      //     newone = el.clone(true);           
      //  el.before(newone);
      //  $("." + el.attr("class") + ":last").remove();
      
       // var elsvg = '<svg width="66px" height="66px"><circle class="circle_2" stroke-position="outside" stroke-width="3" fill="none" cx="34" cy="33" r="29" stroke="#1ECD97"></circle></svg>';
       // $('.wrap svg').remove();
       // $('.wrap').append(elsvg);
       // var elbtn = '<button type="submit" class="btn-large" :class="{disabled:disabled}" >Okay.</button>';
       // $('.wrap button').remove();
       // $('.wrap').prepend(elbtn);

    }
  },
  events:{
    signupResult:function(e,ifsuccess){
      console.log($('.invalid').length);
          if(this.ifsuccess!==null||$('.invalid').length>0){
            return;
          }
          $('.wrap button').text('');
          this.ifsuccess = ifsuccess;
          // 成功即绿色打勾，失败则红色打叉
          $('.wrap button').attr("class", "btn-large circle filled");
          // $(e.target).addClass("circle");
          // $(e.target).addClass("filled");
          if(ifsuccess==false){
            $('.wrap button').addClass("failed");
            // $('.wrap .failtip').removeClass("shownone");
          }
          // $(".wrap i").css("display", "block");



          // if (this.clicked === false){
          //   $(e.target).removeClass("filled");
          //   $(e.target).addClass("circle");
          //   $(e.target).html("");
          //   this.clicked = true;
          //   $("svg").css("display", "block");
          //   $(".circle_2").attr("class", "circle_2 fill_circle");

          //   this.timer = setInterval(
          //     function tick() {
          //       this.clicked = false;
          //       $(e.target).removeClass("circle");
          //       $(e.target).addClass("filled");
          //       if(ifsuccess==false){
          //         $(e.target).addClass("failed");
          //         $('.wrap .failtip').removeClass("shownone");
          //       }
          //       // self.html("b");
          //       $(".wrap i").css("display", "block");
          //       $("svg").css("display", "none");
          //       clearInterval(this.timer);
          //   }, 2500);
          // }
    },
    btnReset:function(){
      if(this.ifsuccess !== null){
        this.resetBtn();
      }
    }
    // removeResult:function(e){
    //   console.log('removeResult');
    //   if(e.target.nodeName=='BUTTON'){
    //     console.log(e.target.nodeName);
    //     return;
    //   }
    //   this.timer = null;
    //   this.clicked = false;
    //   this.ifsuccess= null;
    //   if(this.ifsuccess==false){
    //     $(".wrap button").removeClass('filled,failed');
    //     $(".wrap failtip").addClass('shownone');
    //     $(".wrap i").css('display','none');
    //     console.log('why');
    //     $(".circle_2").removeClass("fill_circle");
    //   }else if(this.ifsuccess==true){
    //     $(".wrap button").removeClass('filled');
    //     $(".wrap i").css('display','none');
    //     $(".circle_2").removeClass("fill_circle");
    //   }
    // }
    
    // fail:function(e){
    //   this.ifsuccess = false;
    //   if (this.clicked === false){
    //     $(e.target).removeClass("filled");
    //     $(e.target).addClass("circle");
    //     $(e.target).html("");
    //     this.clicked = true;
    //     $("svg").css("display", "block");
    //     $(".circle_2").attr("class", "circle_2 fill_circle");

    //     this.timer = setInterval(
    //       function tick() {
    //         $(e.target).removeClass("circle");
    //         $(e.target).addClass("filled");
    //         // self.html("b");
    //         $(".wrap i").css("display", "block");
    //         $("svg").css("display", "none");
    //         clearInterval(this.timer);
    //     }, 2500);
    //   }
    // }
  }

    

        
        
     
    


}
</script>

<style>
/*html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

q, blockquote {
  quotes: none;
}
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

a img {
  border: none;
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}

body {
  text-align: center;
  font-family: "Lato";
}*/

.wrap {
  position: relative;
  margin: auto;
  margin-top: 5%;
  width: 191px;
  text-align: center;
}
/*.wrap .btn-large:hover {
    background-color: none;
}*/
.wrap button.disabled{
  border: none;
}
.wrap button {
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
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-border-radius: 30px;
  -webkit-border-radius: 30px;
  border-radius: 30px;
  -moz-transition: background 0.4s, color 0.4s, font-size 0.05s, width 0.4s, border 0.4s, box-shadow .3s ease-out;
  -o-transition: background 0.4s, color 0.4s, font-size 0.05s, width 0.4s, border 0.4s, box-shadow .3s ease-out;
  -webkit-transition: background 0.4s, color 0.4s, font-size 0.05s, width 0.4s, border 0.4s, box-shadow .3s ease-out;
  transition: background 0.4s, color 0.4s, font-size 0.05s, width 0.4s, border 0.4s, box-shadow .3s ease-out;
  /*transition: box-shadow .3s ease-out;*/
}
/*.wrap button:hover {
  background: #1ECD97;
  color: white;
}*/
.wrap i {
  font-size: 6rem;
  position: absolute;
  top: -15px;
  /*display: none;*/
  left: 50.5px;
  -moz-transform: scale(0.6, 0.6);
  -ms-transform: scale(0.6, 0.6);
  -webkit-transform: scale(0.6, 0.6);
  transform: scale(0.6, 0.6);
  color: transparent;
  -moz-transition: color .3s ease-out;
  -o-transition: color .3s ease-out;
  -webkit-transition: color .3s ease-out;
  transition: color .3s ease-out;
}
.wrap i.shown{
  color: #fff;
}
/*.wrap svg {
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  position: absolute;
  top: -2px;
  left: 62px;
  display: none;
}
.wrap svg .circle_2 {
  stroke-dasharray: 0 200;
}
.wrap svg .fill_circle {
  -moz-animation: fill-stroke 2s 0.4s linear forwards;
  -webkit-animation: fill-stroke 2s 0.4s linear forwards;
  animation: fill-stroke 2s 0.4s linear forwards;
}*/
.wrap .circle {
  width: 60px;
  /*border: 3px solid #c3c3c3;*/
  /* border: none; */
}
.wrap .circle:hover {
  background: none;
}
.wrap .filled {
  background: #12C5A2 !important;
  color: white;
  line-height: 60px;
  font-size: 160%;
}
.wrap .filled.failed{
  background: #F44336 !important;
  border-color: #F44336;
}
.wrap .failtip{
    display: inline-block;
    margin-top: 5px;
    color: #F44336;
}
.wrap .shownone{
  display: none;
}
footer p {
  color: #738087;
  margin-top: 100px;
  font-size: 18px;
  line-height: 28px;
}

@-moz-keyframes fill-stroke {
  0% {
    stroke-dasharray: 0 200;
  }
  20% {
    stroke-dasharray: 20 200;
  }
  40% {
    stroke-dasharray: 30 200;
  }
  50% {
    stroke-dasharray: 90 200;
  }
  70% {
    stroke-dasharray: 120 200;
  }
  90% {
    stroke-dasharray: 140 200;
  }
  100% {
    stroke-dasharray: 182 200;
  }
}
@-webkit-keyframes fill-stroke {
  0% {
    stroke-dasharray: 0 200;
  }
  20% {
    stroke-dasharray: 20 200;
  }
  40% {
    stroke-dasharray: 30 200;
  }
  50% {
    stroke-dasharray: 90 200;
  }
  70% {
    stroke-dasharray: 120 200;
  }
  90% {
    stroke-dasharray: 140 200;
  }
  100% {
    stroke-dasharray: 182 200;
  }
}
@keyframes fill-stroke {
  0% {
    stroke-dasharray: 0 200;
  }
  20% {
    stroke-dasharray: 20 200;
  }
  40% {
    stroke-dasharray: 30 200;
  }
  50% {
    stroke-dasharray: 90 200;
  }
  70% {
    stroke-dasharray: 120 200;
  }
  90% {
    stroke-dasharray: 140 200;
  }
  100% {
    stroke-dasharray: 182 200;
  }
}
a, p {
  line-height: 1.6em;
}

a {
  color: #738087;
}

/* 必需 */
.fade-transition {
  transition: all .3s ease;
  /*font-size: 14px;*/
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.fade-enter, .fade-leave {
  /*font-size: 10px;*/
  opacity: 0;
}
</style>
