/**
 * Author: Prasad.A
 * Copyright: You are free to use or modify this extension in commercial and non-commercial application
 * However, make sure to keep the information about this copyright and author information. Provide the
 * credits whereever possible.
 */
;(function($){
	
	$.fn.pushVirtualPage = function() {
		// Page generally will be pushed w.r.t root node
		var holder = this; 
		// In case the page is pushed w.r.t existing page
		if (this.hasClass('virtualpage') && this.data('isvirtualpage')) {
			holder = this.closest('.virtualpages');
		}
		holder.removeClass('virtualpages').addClass('virtualpages');
		
		var pages = $('.virtualpage', holder);
		
		// Save scroll position
		var activePage = this.activeVirtualPage();
		activePage.data('scrolltop', $(window).scrollTop());
		
		holder.data('virtualpage-activeindex', pages.length);
		pages.hide();
		
		var page = $('<div class="virtualpage"></div>');
		page.data('isvirtualpage', true);
		holder.append(page);
		page.show();
		return page;
	}
	
	$.fn.popVirtualPage = function(limit) {
		// Page generally will be popped off w.r.t root node
		var holder = this;		
		// In case page is being popped off directly
		if (this.hasClass('virtualpage') && this.data('isvirtualpage')) {
			holder = this.closest('.virtualpages');
			if (holder.length) return false;
		}
		
		var pages = $('.virtualpage', holder);
		if (typeof(limit) == 'undefined') limit = pages.length-1;
		
		if (pages.length > limit) {
			pages.hide();			
			var page = pages[pages.length-1];			
			$(page).remove();
			delete page;
						
			var activePage = $(pages[pages.length-2]);
			activePage.show();			
			// Restore scroll position
			if (activePage.data('scrolltop')) {
				$(window).scrollTop(activePage.data('scrolltop'))
			}

			holder.data('virtualpage-activeindex', pages.length-2);
			return true;
		} 
		return false;
	}
	
	$.fn.popVirtualPageTo = function(limit) {
		while (this.popVirtualPage(limit)) continue;
	}
	
	$.fn.getVirtualPage = function() {
		if (this.hasClass('virtualpage')) return this;
		return this.closest('.virtualpage');
	}
	
	$.fn.activeVirtualPage = function() {
		// Page generally will be pushed w.r.t root node
		var holder = this; 
		// In case the page is pushed w.r.t existing page
		if (this.hasClass('virtualpage') && this.data('isvirtualpage')) {
			holder = this.closest('.virtualpages');
		}
		var activeIndex = parseInt(holder.data('virtualpage-activeindex'));
		var pages = $('.virtualpage', holder);
		return $(pages[activeIndex]);
	}
})(jQuery);
