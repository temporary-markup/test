(function ($, window) {
	'use strict';
	$(function () {
		// after fotorama init
		setTimeout(function () {
			$('.expander__icon').on('click.expander', function (e) {
				var $e = $(this).closest('.expander'),
					$content = $e.find('.expander__content'),
					containerHeight = $e.find('.expander__content__container').height(),
					diffHeight = containerHeight - $(this).height();

				// very bad
				$(this).closest('.slider').triggerHandler('slider:resize', [{
					diffHeight: diffHeight,
					duration: 200
				}]);

				$content.css({
					height: $e.find('.expander__content__container').height()
				});
				$e.addClass('expander_mod_visible');
			});
		}, 500);

		$('.expander__content').on('transitionend.expander', function () {
			$(this).removeAttr('style');
		});
	});
})(jQuery, window);