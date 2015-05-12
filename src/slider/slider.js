(function ($, window) {
	'use strict';
	$(function () {
		$('.slider').fotorama({
			width: $(window).width(),
			height: 500,
			allowfullscreen: false
		});
	});
})(jQuery, window);