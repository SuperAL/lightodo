(function(exports) {

    'use strict';

    // For todays date;
    Date.prototype.today = function() {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
    }

    // For the time now
    Date.prototype.timeNow = function() {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
    }

    // Momentum
    function activeDateStringForDate(e) {
        var t = new Date(e);
        // t.getHours() < 5 && (t = new Date(t.getTime() - 864e5));
        var n = t.getFullYear().toString() + "年" + twoDigit(t.getMonth() + 1) + "月" + twoDigit(t.getDate()) + "日";
        return n;
    }

    function twoDigit(e) {
        var t = parseInt(e),
            n = t >= 10 ? t : "0" + t.toString();
        return n.toString();
    }

    exports.datetime = {
        getDate: function() {
            var newDate = new Date();
            return newDate.today();
        },
        getTime: function() {
            var newDate = new Date();
            return newDate.timeNow();
        },
        getActiveDateString: function() {
            var e = new Date();
            return activeDateStringForDate(e);
        },
        getTimeString: function() {
            var e = new Date();
            // var t = m.models.customization.get("hour12clock");
            // var t = 1;

            var n = e.getHours(),
                i = e.getMinutes();
                console.log(n,i);
            // return 1 == t && (n = (n + 11) % 12 + 1), 10 > n && !t && (n = "0" + n), 10 > i && (i = "0" + i), n + ":" + i;
            return 10 > n && (n = "0" + n), 10 > i && (i = "0" + i), n + ":" + i;
        },
        getSeconds:function(){
        	var e = new Date;
        	return e.getSeconds();
        },
        getMinutes:function(){
        	var e = new Date;
        	return e.getMinutes();
        },
        getWeekday:function(){
        	var e = new Date();
        	var weekday=new Array(7);
        	weekday[0]="星期日";
        	weekday[1]="星期一";
        	weekday[2]="星期二";
        	weekday[3]="星期三";
        	weekday[4]="星期四";
        	weekday[5]="星期五";
        	weekday[6]="星期六";
        	return weekday[e.getDay()];
        },
        getTimePeriod: function() {
            return this.get("date").getHours() >= 12 ? "PM" : "AM";
        },
        updateTime: function() {
            var e = this.getTimeString();
            this.get("time") != e && this.set("time", e);
        },
        getPeriod: function() {
            var e, t = this.model.get("date"),
                n = t.getHours();
            return n >= 3 && 12 > n && (e = "morning"), n >= 12 && 17 > n && (e = "afternoon"), (n >= 17 || 3 > n) && (e = "evening"), e;
        }


    };

})(window);
