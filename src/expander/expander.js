(function ($, window) {
	'use strict';
	$(function () {
		// after fotorama init
		setTimeout(function () {
			$('.expander__icon').on('click.expander', function (e) {
				var $e = $(this).closest('.expander'),
					$content = $e.find('.expander__content');

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