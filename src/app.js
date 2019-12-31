import './main.scss';

const $ = require('jquery');
window.jQuery = $;
const FastClick = require('fastclick');
const Modernizr = require('modernizr');

require('jquery-migrate');
require('jquery-waypoints/waypoints');
require('jquery.cycle2');
require('jquery.cycle2.swipe');
require('./vendor/jquery.cycle2.center.js');
require('iscroll');
require('sioweb-jquery-colorbox');
require('jquery.cookie');
            
/*global $, ga*/

$(document).ready(function(){
	"use strict";

	// Librerie per tablet
	FastClick.attach(document.body);
	init();
	verify_cookie();
	
});

function init(){
  "use strict";

	if(Modernizr.touch){
		var myScroll;
		window.startY = 0;
		myScroll = new iScroll('slideslider', {
			momentum: false,
			onScrollMove: function(){ 
				window.startY = -1 * this.startY;
				$(window).trigger('scroll.waypoints'); 
			}
		});
	}

	$('.acquista-item').on('click', function(){
		var url = $(this).attr('href');

		ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
			function () {
				document.location = url;
			}
		});
	});

	
	$('a[data-scroll]').on('click', function(evt){
		var href, target = ( ( href = $(this).attr('href') ) === '#' ? 'html' : href );
		if(Modernizr.touch){
			window.startY = window.startY + $(target).offset().top;
			$(window).trigger('scroll.waypoints'); 
			myScroll.scrollTo(0, $(target).offset().top, 2000, true);
			evt.preventDefault();
		}else{			
			$('html, body').animate({
				'scrollTop': $(target).offset().top
			}, 2000, function(){
				window.location.hash = href.substr(1);
			});
		}

		return false;
	});

	$(".gallery-presentazione").colorbox({rel:'gallerypresentazione', maxWidth: '90%', maxHeight: '90%'});
	$(".gallery-rassegnastampa").colorbox({rel:'galleryrassegnastampa', maxWidth: '90%', maxHeight: '90%'});
	$(".gallery-radiovera").colorbox({rel:'galleryradiovera', maxWidth: '90%', maxHeight: '90%'});
	$(".gallery-radiovera-audio").colorbox({maxWidth: '90%', maxHeight: '90%', iframe: true});
}

function verify_cookie(){
	"use strict";

	if($.cookie('notice-cookie') === undefined){
		$('#privacy-policy').show();
	}

	$('#privacy-policy .btn').on('click', function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		$('#privacy-policy').hide();
		$.cookie('notice-cookie', 'ok', { expires: 365, path: '/' });
	})
}