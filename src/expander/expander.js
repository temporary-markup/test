(function ($, window) {
	'use strict';
	$(function () {
		if (!$('.expander').length) {
			return;
		}

		// fotorama remove html with all handlers, attach all events to dom
		$(window.document).on('click.expander', '.expander__icon', function (e) {
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
		}).on('transitionend.expander', '.expander__content', function () {
			$(this).removeAttr('style');
		});
	});
})(jQuery, window);