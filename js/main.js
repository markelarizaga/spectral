/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Cookies consent
			var $cookiesNoticePopup = $('#cookies-notice');
			if(document.cookie.indexOf('cookie-consent') === -1){
				$cookiesNoticePopup.removeClass('hidden');
				$('#accept-cookies-button').one('click', cookiesAccepted);
			} else {
				loadGoogleAnalytics();
			}

			$body.scrollex({
					top:		$banner.outerHeight() + 1,
					enter:		function() { $cookiesNoticePopup.addClass('alt'); },
					leave:		function() { $cookiesNoticePopup.removeClass('alt'); }
				});

			function cookiesAccepted(){
				$cookiesNoticePopup.addClass('hidden');
				addCookie('cookie-consent', true, 1000);
				loadGoogleAnalytics();
			}

			function addCookie(name, value, expirationDays){
				var now = new Date();
    			now.setTime(now.getTime() + (expirationDays*24*60*60*1000));
				document.cookie = name + '=' + value + '; expires=' + now.toUTCString();
			}

			function loadGoogleAnalytics(){
				var script = document.createElement('script');
				script.src = '/js/googleAnalytics.js';
				document.head.appendChild(script);
			}

	});

})(jQuery);
