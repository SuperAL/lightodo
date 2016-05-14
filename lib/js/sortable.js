(function (exports) {

	'use strict';

	var STORAGE_KEY = 'lightodo-cards';

	exports.sortable = {
		todosSortable: function(el){
			var sortable = Sortable.create(el,{ 
				group: { name: "lightodo", pull: true, put: true },

		// setData: function (dataTransfer, dragEl) {
		// 	        dataTransfer.setData('Text', dragEl.textContent);
		// 	    }

			 //    // dragging started
			 //    onStart: function (/**Event*/evt) {
			 //        // evt.oldIndex;  // element index within parent
			 //        console.log("onStart:");
			 //        console.log(evt.oldIndex);
			 //    },

			 //    // dragging ended
			 //    onEnd: function (/**Event*/evt) {
			 //        // evt.oldIndex;  // element's old index within parent
			 //        // evt.newIndex;  // element's new index within parent
			 //        console.log("onEnd:");
			 //        console.log(evt.oldIndex);
			 //        console.log(evt.newIndex);
			 //    },

			 //    // Element is dropped into the list from another list
			 //    onAdd: function (/**Event*/evt) {
			 //        var itemEl = evt.item;  // dragged HTMLElement
			 //        // evt.from;  // previous list
			 //        console.log("onAdd:");
			 //        console.log(itemEl);
			 //        console.log(evt.from);
			 //        // + indexes from onEnd
			 //    },

			 //    // Changed sorting within list
			 //    onUpdate: function (/**Event*/evt) {
			 //        var itemEl = evt.item;  // dragged HTMLElement
			 //        // + indexes from onEnd
			 //        console.log("onUpdate:");
			 //        console.log(itemEl);
			 //    },

			 //    // Called by any change to the list (add / update / remove)
			 //    onSort: function (/**Event*/evt) {
			 //        // same properties as onUpdate
			 //        var itemEl = evt.item;  // dragged HTMLElement
			 //        // + indexes from onEnd
			 //        console.log("onSort:");
			 //        console.log(itemEl);
			 //    },

			 //    // Element is removed from the list into another list
			 //    onRemove: function (/**Event*/evt) {
			 //        // same properties as onUpdate
			 //         var itemEl = evt.item;  // dragged HTMLElement
			 //        // + indexes from onEnd
			 //        console.log("onRemove:");
			 //        console.log(itemEl);
			 //    },


			 //    // Event when you move an item in the list or between lists
			 //    onMove: function (/**Event*/evt) {
			 //        // Example: http://jsbin.com/tuyafe/1/edit?js,output
			 //        evt.dragged; // dragged HTMLElement
			 //        evt.draggedRect; // TextRectangle {left, top, right и bottom}
			 //        evt.related; // HTMLElement on which have guided
			 //        evt.relatedRect; // TextRectangle
			 //        // return false; — for cancel
			 //    } 

			});
			console.log("sortable");
			return sortable;
		},
		cardsSortable:function(el){
			var sortable = Sortable.create(el,{ 
				handle: ".sortBtn",
				setData: function (dataTransfer, dragEl) {
					        dataTransfer.setData('Text', dragEl.textContent);
					        // console.log('dragEl:'+$(dragEl).width());
					        var xOffset = $('.card.white').width();
					        dataTransfer.setDragImage(dragEl, xOffset, 0);
					    }
			})
		}
	};	

})(window);