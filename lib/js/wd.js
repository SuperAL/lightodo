/*jshint unused:false */

(function(exports) {

    'use strict';

    var ref = new Wilddog("https://lightodo.wilddogio.com/");
    exports.wdsync = {
        updateData:function(value){
            console.log('update wilddog');
            if(ref.getAuth()){
                var uid = ref.getAuth().uid;
                // .split(":")[1];
                // replace('simplelogin:','');
                ref.child(uid).update(value);
            }
            
            // console.log(uid);
            
        },
        fetchData:function(key){

        }
        // userReffn:{
        //     save:function(userRefset){
        //         userRef = userRefset;
        //         userRef.on("value", function(data) {
        //           console.log(data.val()['nickname']);
        //           userVal = data;
        //         })
        //     }
        // },
        // nickname:{
        //     fetch:function(){
        //         return userVal.val()['nickname'];
        //     }
        // },
        // unauth:function(){
        //     ref.unauth();
        // }

    };


})(window);
