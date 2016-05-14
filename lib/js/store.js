// Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads.  The keys can be strings or integers, but the values are always strings.  You can access these values like an object, or with the getItem() and setItem() methods.  These three lines all set the colorSetting entry in the same way:

// localStorage.colorSetting = '#a4509b';
// localStorage['colorSetting'] = '#a4509b';
// localStorage.setItem('colorSetting', '#a4509b');

// test whether the storage object has already been populated (i.e., the page was previously accessed)
// if(!localStorage.getItem('bgcolor')) {
//   populateStorage();
// } else {
//   setStyles();
// }
// Note: You could also use Storage.length to test whether the storage object is empty or not.

// setItem
// getItem
// removeItem

/*jshint unused:false */

(function(exports) {

    'use strict';

    var STORAGE_KEY = 'lightodo-cards';
    var SORTCLOSE_KEY = 'lightodo-sort';
    var TIME_KEY = 'lightodo-time';
    // NOW_KEY = 'lightodo-now'
    // REMINDER_KEY = 'lightodo-reminder'
    var QUOTE_KEY = 'lightodo-quote';

    exports.lightodoStorage = {
        todoStorage: {
            fetch: function() {
                return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            },
            save: function(cards) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
            }
        },
        sortStorage: {
            fetch: function() {
                return JSON.parse(localStorage.getItem(SORTCLOSE_KEY) || 'true');
            },
            save: function(sort) {
                localStorage.setItem(SORTCLOSE_KEY, JSON.stringify(sort));
            }
        },
        timeStorage:{
            fetch: function() {
                return JSON.parse(localStorage.getItem(TIME_KEY) || 'true');
            },
            save: function(time) {
                localStorage.setItem(TIME_KEY, JSON.stringify(time));
            }
        },
        nrStorage:{
            fetch: function(KEY) {
                return JSON.parse(localStorage.getItem(KEY)) || '';
            },
            save: function(KEY,nor) {
                localStorage.setItem(KEY, JSON.stringify(nor));
            }
        },
        quoteStorage:{
            fetch: function() {
                return JSON.parse(localStorage.getItem(QUOTE_KEY)) || "If you lose, don't lose the lesson.";
            },
            save: function(quote) {
                localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
            }
        }
        // reminderStorage:{
        //     fetch: function() {
        //         return JSON.parse(localStorage.getItem(REMINDER_KEY) || '[]');
        //     },
        //     save: function(reminders) {
        //         localStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
        //     }
        // }

    };


})(window);
