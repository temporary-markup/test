(function ($, window) {
	'use strict';
	$(function () {
		var getMaxItemsHeight = function ($items) {
			var maxItemHeight = 0;
			$items.each(function () {
				maxItemHeight = Math.max(maxItemHeight, $(this).height());
			});
			return maxItemHeight;
		};

		$('.slider').each(function () {
			$(this).fotorama({
				minWidth: '100%',
				height: getMaxItemsHeight($(this).find('.slider__item')),
				margin: 0,
				allowfullscreen: false,
				click: false
			});
		}).on('slider:resize', function (e, options) {
			var $fotorama = $(this).data('fotorama');
			if (!$fotorama || !options) {
				return;
			}

			if (options.diffHeight) {
				$fotorama.resize({
					height: $(this).find('.fotorama__stage').height() + options.diffHeight
				}, options.duration || 0);
			}
		});
	});
})(jQuery, window);