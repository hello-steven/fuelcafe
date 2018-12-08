/*-------add class "active" to any links to current page---------- */
$(function(){
	$('a').each(function() {
		// console.log($(this) + "active");
		if ($(this).prop('href') == window.location.href) {
			$(this).addClass('active');
		}
	});
});
function goto(where, offset_px) {
	// console.log('goto('+where+')');
	// $('.contain-drag').addClass('goto');
	$('html,body').scrollTo(where, 500, {offset: offset_px});
	// open_mobile_nav(); // close it
}


// telling google analytics what's happening
function ga_tracking (current_page, hitType, eCat, eAction, eLabel) {
	if (hitType == 'undefined' || hitType == null) {
		hitType = 'pageview';
	}
	
	ga('set', 'page', '/'+current_page);
	
	//valid ga hitTypes: pageview, screenview, event, transaction, item, social, exception, timing
	if (hitType == 'pageview') {
		console.log("ga_tracking(send, "+hitType+", "+current_page+")");
		ga('send', hitType, current_page);
	} else if (hitType == 'event') {
		//Custom Category: Select Location
		//Custom Action options: location_click, location_swipe, location_drag
		//Custom Label syntax: (current_page) - (current_location) - (prev_action)
		ga('send', hitType, {
		  'eventCategory' : eCat,
		  'eventAction' : eAction,
		  'eventLabel' : eLabel+ ', current_page: '+current_page
		});
		console.log("ga('send', "+hitType+" {'eventCategory' : "+eCat+", 'eventAction : "+eAction+", 'eventLabel : "+eLabel+", current_page: "+current_page+"})");
	} else if (hitType == 'non-event') {
		ga('send', 'event', {
		  'eventCategory' : eCat,
		  'eventAction' : eAction,
		  'eventLabel' : eLabel+ ', current_page: '+current_page,
		  'nonInteraction' : true
		});
		console.log('non-interaction');
	}
	//console.log('>>> current_page: '+current_page+', hitType: '+hitType+', eCat: '+eCat+', eAction: '+eAction+ ', eLabel: '+eLabel);
}

//load page on correct content section
if (location_url != 'undefined' && location_url != '') {
	console.log('location_url: '+location_url);
	
	var location_test = location_url.split('/');
	console.log(location_test);
	if (location_test[0] == 'walkers_point' || location_test[0] == 'center_street') {
		select_dir = (location_test[0] == 'walkers_point') ? 'right' : 'left';
		location_url = location_test[1];
		console.log('new location_url: '+location_url);
		$( document ).ready(function() {
			selectLocation (select_dir, 'direct_url');
		});
	}
	
	$('html,body').scrollTo($('#'+location_url), 0, {offset: 0});
	document.title = titleCase(location_url) + ' · Fuel Cafe';
	$('.main-nav a[href="#'+location_url+'"], .fuel-menu a[href="#'+location_url+'"]').addClass('active');
}

function modify_location_url (add_location, add_end) {
	
	//grab the current window pathname to modify
	console.log('window.location.pathname: '+window.location.pathname);
	var keep_page =  window.location.pathname.split('/');
	var start_path;
	var end_path;
	console.log('keep_page[1]: '+keep_page[1]);
	console.log(keep_page);
	
	//check if the pathname is for a restaurant location
	if (keep_page[1] == 'walkers_point' || keep_page[1] == "center_street") {
		end_path = "/"+keep_page[2];
		start_path = "/"+keep_page[1];
		console.log("end_path: "+end_path+", start_path: "+start_path);
	} else {
		end_path = "/"+keep_page[1];
		start_path = "";
		console.log("end_path: "+end_path+", start_path: "+start_path);
	}
	
	//check if we want to remove the restaurant from the url
	if (add_location != 'remove_location') {
		console.log('add_location: '+add_location);
		
		//check if we want the restaurant name to change
		if (add_location == 'keep_location') {
			new_path = start_path+add_end;
			console.log("add_end: "+add_end+", new_path: "+new_path);
		} else {
			new_path = "/"+add_location+end_path;
			console.log("new_path: "+new_path);
		}
	} else {
		new_path = end_path;
		console.log("new_path: "+new_path);
	}
	
	//swap out current url for modified url
	history.pushState(null, null, new_path);
	
}

//Source: http://www.corelangs.com/js/string/cap.html#sthash.jPATfAoW.dpuf
function titleCase(string) { 
	if (string != undefined) {
		// console.log('titleCase: '+string);
		return string.charAt(0).toUpperCase() + string.slice(1); 
	}
} 

window.onpopstate = function(e) {
  // console.log(e);
  var returnLocation = history.location || document.location;  
  var current = window.location.pathname.replace('/','');
  $('html,body').stop().animate({ scrollTop: window[current+'_top'] }, { queue:false, duration: 1000, easing: 'easeInOutExpo'});
}


// mobile device orientation event
/*
if ($(window).width() < 750) {
	window.addEventListener("deviceorientation", handleOrientation, true);
	function handleOrientation(event) {
	  var absolute = event.absolute;
	  var alpha    = event.alpha;
	  var beta     = event.beta;
	  var gamma    = event.gamma;
	
	  // Do stuff with the new orientation data
	}
}
*/


//clicked the top nav
// $('ul.unstyled','#white-strip').on('click','a',function(e){
	
// 	e.preventDefault();
	
// 	history.pushState(null, null, $(this).data('div').replace('#','/'));
	
// 	var scrollTop = window[$(this).data('div').replace('#','')+'_top'];

// 	program_scroll = true;

// 	$('html,body').stop().animate({ scrollTop: scrollTop }, {queue:false, duration: 1000, easing: 'easeInOutExpo', complete:function(){

// 		program_scroll = false;
		
// 		$(window).trigger('scroll');
		
// 	}});
// });


// window.onpopstate = function(e) {
//   var returnLocation = history.location || document.location;  
//   var current = window.location.pathname.replace('/','');
//   $('html,body').stop().animate({ scrollTop: window[current+'_top'] }, { queue:false, duration: 1000, easing: 'easeInOutExpo'});
// }

//mobile background images
if ($(window).width() < 481) {
	
	$('.section-wrapper').each(function(v, w){
		//console.log(v);
		//console.log(w);
		if ($(w).attr("data-mobile") != undefined) {
			//console.log($(w).attr("data-mobile"));
			var mobile = $(w).attr("data-mobile");
			//console.log(mobile);
			$(w).css('background-image', 'url("' + mobile + '")');
		}
	});
}
/*----End Campaign Slider Mobile Width----*/

var nav_click = false;
var nav_timer;
var animation_timer;
$(function(){
	$('.main-nav a, .fuel-menu li > a').each(function() {
		$(this).click( function () {
			nav_click = true;
			console.log(">>>start nav_click: "+nav_click);
			$('.main-nav a, .fuel-menu a').removeClass('active');
			var elem = $(this).data('url');
			$('.location-controller, .helper-text').removeClass('animate')
/*
			console.log(">>>nav click");
			console.log(elem);
*/

			//mobile check
			if ($(window).width() >= 750) {
				goto(elem, 0);
				console.log(elem);
			} else {
				goto(elem, -50);
				console.log(elem);
			}
			nav_timer = setTimeout(allow_scroll, 1000);
			var page_title = $(this).data('url').replace('#','');
			//history.pushState(null, null, $(this).data('url').replace('#','/'));
			modify_location_url ("keep_location", $(this).data('url').replace('#','/'));
			document.title = titleCase(page_title)+' · Fuel Cafe';
			//console.log("titleCase("+titleCase(page_title)+")");
			ga_tracking(page_title);
			ga_tracking(page_title, 'event', 'Nav Menu', page_title+' Click', elem);
			//TODO: Add ga_tracking event to determine how many users have found the top menu
			// contentSmoothScroll(elem, $(this));
			$(this).addClass('active');
			
			//restart controller animation if no location is selected
			if ($('.set-right').length < 1 && $('.set-left').length < 1) {
				console.log('restart location animation');
				animation_timer = setTimeout(restart_helper_animation, 750);
			}
			
			return false;
		});
	});
});

function restart_helper_animation () {
	clearTimeout(animation_timer);
	$('.location-controller').addClass('animate');
}

function allow_scroll () {
	clearTimeout(nav_timer);
	nav_click = false;
	console.log(">>> end nav_click: "+nav_click);
}

function unpop () {
	$('.main-nav a, .fuel-menu a').removeClass('active');
	// console.log('unpop');
	console.log(">>>start nav_click: "+nav_click);
	nav_click = true;
	nav_timer = setTimeout(allow_scroll, 1000);
	
	//history.pushState(null, null, '/');
	modify_location_url ("keep_location", "/");
	document.title = 'Home · Fuel Cafe';
	ga_tracking ("/");
	ga_tracking("/", 'event', 'Nav Logo', 'Logo Click', '/');
}

$( document ).ready(function() {

	if ($(window).width() < 750) {
		reset_draggable();
		$("body").swipe( {swipe:swipeLocation, allowPageScroll:"none"});
	}

	$('.byte-logo-carousel').on('init', function(slick) {
		// console.log("+ .center-street-slider init'd");
		$('.byte-logo-carousel-pane').removeClass('is-hidden');
		$('.byte-logo-carousel-pane').addClass('is-visible');
		$('.byte-parent-logo-carousel').removeClass('is-hidden-fade');
		$('.byte-parent-logo-carousel').addClass('is-visible-fade');
	})

	$('.byte-logo-carousel').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		touchMove: true,
		dots: false,
		arrows: true,
		responsive: [
			{ // repeat as necessary
				breakpoint: 750,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{ // repeat as necessary
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		],
		autoplay: false,
		autoplaySpeed: 5000,
		fade: false,
	});
	
	// 	featured menu item slider
	if ($('.featured-menu-slider').length > 0) {
		
		$('.featured-menu-slider').each(function (i,v) {
			$(v).on('init', function(slick) {
				//console.log('initated');
				$(v).addClass('is-visible');
				$(v).addClass('is-visible-fade');
			});
		});
		
		$('.featured-menu-slider').each(function (i,v) {
		//console.log('each slider'+v);
			if (!$(v).hasClass('slick-initialized')) {
				var rotation = ($(v).hasClass('rtl-active')) ? true : false;
				var start_index = ($(v).hasClass('rtl-active')) ? 0 : 0;
				console.log('menu slick rotation rtl: '+rotation+", start_index: "+start_index);
				$(v).attr('data-nav-id', i);
				$(v).slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: false,
					speed: 500,
					touchMove: false,
					dots: false,
					arrows: false,
					autoplay: false,
					pauseOnHover: false,
// 					slidesToScroll: start_index,
					rtl: rotation,
					fade: false,
				});	
			}
		});//end $('.featured-menu-slider').each(function (i,v)
		
	} //if ($('.featured-menu-slider').length > 1)
	if ($('.featured-menu-img-slider').length > 0) {
		
		
		//create sliderElem array to store elements that we want to check for visibility
		var sliderElems = [];
		
		$('.featured-menu-img-slider').each(function (i,v) {
			$(v).on('init', function(slick) {
				var slider_elem = {};
				slider_elem.elem = $(v);
				slider_elem.start_autoplay = true;
				sliderElems.push(slider_elem);
				//console.log('initated');
				$(v).addClass('is-visible');
				$(v).addClass('is-visible-fade');
// 				$(v).slick('slickPause');
			});
		});
		
		$(window).scroll(function(event){
			
		    //check if slider is visible to start autoplay
		    $.each(sliderElems, function(index, slider_elem) {
			    if ($(slider_elem.elem).hasClass('slick-initialized')) {
			        if( $(slider_elem.elem).hasClass('visible') && slider_elem.start_autoplay == true){
						//$(v).slick("slickSetOption","autoplay",false,true);
						console.log("slickPlay");
			            $(slider_elem.elem).slick("slickPlay");
					    console.log("slider_elem.start_autoplay: "+slider_elem.start_autoplay);
			            slider_elem.start_autoplay = false;
			        } else if (!$(slider_elem.elem).hasClass('visible')) {
						//$(v).slick("slickSetOption","autoplay",true,true);
						console.log("slickPause");
			            $(slider_elem.elem).slick("slickPause");
					    console.log("slider_elem.start_autoplay: "+slider_elem.start_autoplay);
			            slider_elem.start_autoplay = true;
			        }
		        }
			});
		}); 
		
		$('.featured-menu-img-slider').each(function (i,v) {
		//console.log('each slider'+v);
			if (!$(v).hasClass('slick-initialized')) {
				var rotation = ($(v).hasClass('rtl-active')) ? true : false;
				var start_index = ($(v).hasClass('rtl-active')) ? 2 : 0;
				console.log('img slick rotation rtl: '+rotation+", start_index: "+start_index);
				$(v).slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: false,
					centerMode: true,
					centerPadding: '0px',
					speed: 500,
					touchMove: false,
					dots: false,
					arrows: false,
					autoplay: true,
					autoplaySpeed: 6500,
					pauseOnHover: false,
// 					slidesToScroll: start_index,
					rtl: rotation,
					fade: false,
					variableWidth: true,
					asNavFor: '.featured-menu-slider[data-nav-id="'+i+'"]',
				});	
			}
		});//end $('.featured-menu-slider').each(function (i,v)
		
	}
	
	ga_tracking (window.location.pathname, 'non-event', 'pageload', 'Finish Loading', 'Tracking Enabled');
	
	//create footerAddressElems array to store location address elements
	var footerAddressElems = [];

	$('.address-footer .cafe-info-content a').each( function (index) {
		var address_elem = {};
		address_elem.elem = $(this);

		//add object to visible array
		footerAddressElems.push(address_elem);
	});
	
	$.each(footerAddressElems, function(index, address_elem) {
		address_elem.elem.click(function() {
			ga_tracking ('Footer Contact Info', 'event', 'Call Location - Mobile', 'click to call', 'phone#: '+address_elem.elem.text());	
		});			
	});
	

});

/*-------Smooth scroll to content---------- */
function contentSmoothScroll(loc, elem) {
	// console.log($(loc));
	var moveTo = 0;
	
	if($(loc).length > 0) {
		moveTo = $(loc).offset().top + (-53);
	} else {
		moveTo = 0;
	}
	
	$('html,body').animate({
		scrollTop: moveTo
	}, 500);
	$(elem).unbind("mouseenter mouseleave");
}


$(document).ready(function() {

	remove_loader();
	
/*-------Add class to visible elems on scroll---------- */

	//create visibleElem array to store elements that we want to check for visibility
	var visibleElems = [];

	$('.check-visible').each( function (index) {
		var visible_elem = {};
		visible_elem.elem = $(this);

		//add object to visible array
		visibleElems.push(visible_elem);
	});

	$(window).scroll(function(event){
		$.each(visibleElems, function(index, visible_elem) {
			// console.log(visible_elem.elem);
			// console.log(visible_elem.elem.visible(true));
			if (visible_elem.elem.visible(true)) {
				visible_elem.elem.addClass('visible');
			} else {
				visible_elem.elem.removeClass('visible');
			}
		});
	});  
});


function remove_loader () {
//example html: <div class="byte-carousel-pane" data-image-src="<?=$row['image']?>" style="visibility: visible;">
	$('.check-loaded').each(function(e, v) {
		// console.log('starting to load image: '+$(v).attr('data-image-src'));

		$('<img/>').attr('src',$(v).attr('data-image-src')).load(function() {
			// console.log('loaded and added '+$(v).attr('data-image-src'));

			//add remove data-image-src after loaded
			$(v).css("background-image", "url("+$(v).attr('data-image-src')+")");
			$(v).removeAttr('data-image-src');

			$(this).remove(); // prevent memory leaks as @benweet suggested
			
			// let's count and see what's left to load
			thingstoloadcount = 0;
			$('.check-loaded').each(function(e, v) {
				if ($(v).attr('data-image-src')) thingstoloadcount++;
			});
			// console.log('count of things still to load: '+thingstoloadcount);

			if (thingstoloadcount==0) {
				// console.log('down to 0 things to load, so fade in and play slick');
				//{{After images are loaded do things here}}
				$('.loader-overlay').delay(500).fadeOut(500);
				$('.location-controller, .helper-text').addClass('animate');
			}

		});
		
	});
}
/*SEARCH PATTERN script*/

/*	==========================================================================
	Active Nav Item on Scroll
	==========================================================================
*/

//Active Nav Item on Scroll
if ($('.center-street .section-wrapper').length > 0) {

	//Create array to store each Section element we want to watch
	var sectionWrappers = [];
	var home_active = false;

	//Loop through each section and store the elem and top offset in object
	$('.center-street .section-wrapper').each( function (index){
		var section_wrapper = {};
		section_wrapper.elem = $(this);
		section_wrapper.offset_top = $(this).offset().top;
		section_wrapper.active_page = true;
		section_wrapper.page_name = ($(this).attr('id') != undefined) ? $(this).attr('id') : 'home';

		//add object to section array
		sectionWrappers.push(section_wrapper);
	});

	var nav_id;
	$(window).scroll(function (){
		
// 		console.log('>>>scrolling scroll_top: '+$(window).scrollTop());
		// console.log('scroll_goto');
		var scrollDistance = $(this).scrollTop();
		
		if (nav_click == false) {
// 			console.log(">>>scrolling :: nav_click: "+nav_click);
		
			//loop through section array
			$.each(sectionWrappers, function(index, section_wrapper) {
	
				var elem_scroll = section_wrapper.offset_top
				
				if (elem_scroll <= scrollDistance + 100 && elem_scroll >= scrollDistance - 50) {
					$('.fuel-menu a').removeClass('active');
					
					if ($(section_wrapper.elem).hasClass('menu-target') ) {
						nav_id = $(section_wrapper.elem).attr('id');
					}
					
// 					console.log('>>nav scroll triggered: '+elem_scroll + ', '+scrollDistance+', page_name: '+section_wrapper.page_name+', nav-id: '+nav_id);
	
					if (nav_id != undefined){
						// console.log('>>>nav_id: '+nav_id);
						$('.fuel-menu a[data-url="#'+nav_id+'"]').addClass('active');
						$('.section-title, .side-title').text(nav_id);
						document.title =  titleCase(nav_id) + ' · Fuel Cafe';
						
						//We only want to track an active page once for history && analytics
						if(section_wrapper.active_page == true) {
							//reset to allow reporting for all active pages	
							$.each(sectionWrappers, function(this_index, this_section_wrapper) {
								this_section_wrapper.active_page = true;
								console.log('>>>scrolling ::: allow reporting for all active pages');
							});
							history.pushState(null, null, nav_id);
							ga_tracking (nav_id);
							console.log(">>>scrolling ::: history/tracking sent >>> section_wrapper.active_page: "+section_wrapper.active_page+', page_name: '+section_wrapper.page_name+', nav_id: '+nav_id);
							section_wrapper.active_page = false;
						} else if (section_wrapper.active_page == false) {			
							//reset to allow reporting active home page				
							home_active = true;
							console.log('>>>scrolling ::: allow reporting for home page');
						}
// 						console.log("history/tracking not sent >>> section_wrapper.active_page: "+section_wrapper.active_page+', page_name: '+section_wrapper.page_name+', nav_id: '+nav_id);
						
					} else if (nav_id == undefined) {
						// console.log('>>undefined nav scroll triggered: '+nav_id+', : '+elem_scroll + ', '+scrollDistance);
						if(section_wrapper.active_page == true) {
							history.pushState(null, null, '/');
							console.log(">>>scrolling ::: history sent >>> section_wrapper.active_page: "+section_wrapper.active_page+', page_name: '+section_wrapper.page_name+', nav_id: '+nav_id);
							section_wrapper.active_page = false;
						} else if (section_wrapper.active_page == false) {			
							//reset to allow reporting active home page				
/*
							home_active = true;
							console.log('>>>scrolling ::: allow reporting for home page');
*/
						}
						document.title = 'Home · Fuel Cafe';
						$('.fuel-menu a').removeClass('active');
						$('.section-title, .side-title').text('');
						//$('.fuel-menu li').removeClass('stepped');
// 						console.log(">>>scrolling ::: history not sent >>> nav_id: "+nav_id+', page_name: '+section_wrapper.page_name);
					}
					
				} else if ($(window).scrollTop() <= 25) {
					$('.fuel-menu a').removeClass('active');
					
					$('.section-title, .side-title').text('');
					document.title = 'Home · Fuel Cafe';
					// console.log($(window).scrollTop());
					if (home_active == true) {
						
						//reset to allow reporting active pages	
						$.each(sectionWrappers, function(this_index, this_section_wrapper) {
							this_section_wrapper.active_page = true;
							console.log('>>>scrolling ::: allow reporting for all active pages');
						});
						
						history.pushState(null, null, '/');
						ga_tracking ("");
						console.log(">>>scrolling ::: history/tracking sent >>> home_active: "+home_active+', page_name: '+section_wrapper.page_name);
						home_active = false;
					}
// 					console.log(">>>scrolling ::: history/tracking not sent >>> home_active: "+home_active+', page_name: '+section_wrapper.page_name);
				}
			});
		}
	});
}

/*	==========================================================================
	[mobile] - Sticky Header On Scroll
	==========================================================================
*/

//
function sticky_elem (elem_name) {	
//Set Variables
var elem = $(elem_name);
    elemClass = "show";
    stickyHeight = ($('.location-logo:nth-child(1)').height() + 50);
	// console.log('stickyHeight: '+stickyHeight);
	
	// Add/Remove class to elem after scrolling
    $(window).scroll(function() {
		if( $(this).scrollTop() > stickyHeight ) {
			elem.addClass(elemClass);
		} else {
			elem.removeClass(elemClass);
		}
	});
}
         
$(document).ready(function() {
	
	if($(window).width() > 949) {
		sticky_elem ('.secondary-logo');
	} else {

		// var stage = document.getElementsByTagName('body');
		// // console.log(stage);
		// var body_swipe = new Hammer(stage);

		// body_swipe.on('swipeleft swiperight', function(ev) {
		// 	console.log(ev);
		// 	console.log(ev.type);
		// });

		sticky_elem('.fixed-logo');
	}

});

//Split JS 
// -- CHANGELOG :: split.js has been modified on line: 481 :: SP - MAR 2017
// -- split.js now checks if a gutter is already in the dom before creating a new one
// -- This allows us to put elements that need to be fixed to the gutter inside of the gutter div
// -- CHANGELOG :: split.js has been modified on line: 179 :: SP - MAR 15 2017
// -- split.js now checks if you are dragging an element with an href, localName != "a", && classList != "to-top" before running drag functions
// -- You can find a backup: split.mod.backup.js @ /assets/vendor

if ($(window).width() >= 750) {
	// console.log('window width: '+ $(window).width());
	//desktop settings
	from_view = '';
	var main_split = Split(['#center_street', '#walkers_point'], {
		sizes: [50,50],
		minSize: 300,
		gutterSize: 5,
		cursor: 'col-resize',
		onDragStart: function () {
			// console.log('start drag: ');
			$('.location-controller, .helper-text').removeClass('animate');
			if ($('.body-wrapper.set-left').length > 0) {
				from_view = "Walker's Point";
				console.log(">>>from_view: "+from_view);
			} else if ($('.body-wrapper.set-right').length > 0) {
				from_view = 'Center Street';
				console.log(">>>from_view: "+from_view);
			} else {
				from_view = "Split View"
				console.log(">>>from_view: "+from_view);
			}
		},
		onDrag: function () {

			// console.log(this);
			$('.helper-text').fadeOut();

			// console.log(main_split.getSizes());
			var split_sizes = main_split.getSizes();
			var left_overlay = false;
			var right_overlay = false;
			if ($(window).width() < 1024) {
				//overlay left
				if (split_sizes[0] < 40 && left_overlay != true) {
					// console.log('>>> left less than 35');
					$('.center-street .overlay').fadeIn();
					left_overlay = true;
				} else if (split_sizes[0] > 35) {
					$('.center-street .overlay').fadeOut();
					left_overlay = false;
				} 
	
				//overlay right
				if (split_sizes[1] < 40) {
					// console.log('>>> right less than 35');
					$('.walkers-point .overlay').fadeIn();
					right_overlay = true;
				} else if (split_sizes[1] > 35) {
					$('.walkers-point .overlay').fadeOut();
					right_overlay = false;
				}
				$(".byte-logo-carousel").slick('setPosition');	
			} else {
				//overlay left
				if (split_sizes[0] < 35 && left_overlay != true) {
					// console.log('>>> left less than 35');
					$('.center-street .overlay').fadeIn();
					left_overlay = true;
				} else if (split_sizes[0] > 35) {
					$('.center-street .overlay').fadeOut();
					left_overlay = false;
				} 
	
				//overlay right
				if (split_sizes[1] < 35) {
					// console.log('>>> right less than 35');
					$('.walkers-point .overlay').fadeIn();
					right_overlay = true;
				} else if (split_sizes[1] > 35) {
					$('.walkers-point .overlay').fadeOut();
					right_overlay = false;
				}
				$(".byte-logo-carousel").slick('setPosition');	
			}
			
			var split_width = '';
			$('.split').each( function (){
				split_width = parseFloat($(this).css('width'), 10);
				// console.log('>>>conso split_width: '+split_width);
			});
			
			if( $('.featured-menu-img-slider').length > 0 ){
				$(".featured-menu-img-slider, .featured-menu-slider").each( function(id, slider){
					$(slider).slick('setPosition');
				});
			}
		},
		onDragEnd: function () {
			// console.log('end drag: ');

			//get left/right values
			// console.log(main_split.getSizes());
			var split_sizes = main_split.getSizes();
			var ga_event_category = '';
				ga_event_action = 'Location drag';
				from_action = 'location_'+$('.body-wrapper').attr('data-action');
			// console.log('left: '+split_sizes[0]);
			// console.log('right: '+split_sizes[1]);
			if ($(window).width() < 1024) {
				
				//snap to left
				if (split_sizes[0] < 40) {
					// console.log('>>> end less than 40');
					main_split.setSizes([25,75]);
					$('.body-wrapper').addClass('set-left').removeClass('set-right').attr('data-action', 'drag');
					ga_event_category = "Select Walker's Point";
					modify_location_url ('walkers_point');
				//snap to right
				} else if (split_sizes[1] < 40) {
					// console.log('>>> end less than 40');
					main_split.setSizes([75,25]);
					$('.body-wrapper').addClass('set-right').removeClass('set-left').attr('data-action', 'drag');
					ga_event_category = "Select Center Street";
					modify_location_url ('center_street');
				//snap to center
				} else {
					$('.split .overlay').fadeOut();
					main_split.setSizes([50,50]);
					// console.log('*** remove overlay ***');
					$('.body-wrapper').removeClass('set-right set-left').attr('data-action', 'drag');
					ga_event_category = "Select Split View";
					modify_location_url ('remove_location');
				}
			} else {
				
				//snap to left
				if (split_sizes[0] < 35) {
					// console.log('>>> end less than 40');
					main_split.setSizes([25,75]);
					$('.body-wrapper').addClass('set-left').removeClass('set-right').attr('data-action', 'drag');
					ga_event_category = "Select Walker's Point";
					modify_location_url ('walkers_point');
				//snap to right
				} else if (split_sizes[1] < 35) {
					// console.log('>>> end less than 40');
					main_split.setSizes([75,25]);
					$('.body-wrapper').addClass('set-right').removeClass('set-left').attr('data-action', 'drag');
					ga_event_category = "Select Center Street";
					modify_location_url ('center_street');
				//snap to center
				} else {
					$('.split .overlay').fadeOut();
					main_split.setSizes([50,50]);
					// console.log('*** remove overlay ***');
					$('.body-wrapper').removeClass('set-right set-left').attr('data-action', 'drag');
					ga_event_category = "Select Split View";
					modify_location_url ('remove_location');
				}
			}
			ga_tracking (window.location.pathname, 'event', ga_event_category, ga_event_action, 'prev_location: '+from_view+', prev_action: '+from_action);
			// HEY STEVEN this refreshes the size of the slider when it changes. don't touch <3
			$(".byte-logo-carousel").slick('setPosition');	
			
			if( $('.featured-menu-img-slider').length > 0 ){
				$(".featured-menu-img-slider, .featured-menu-slider").each( function(id, slider){
					$(slider).slick('setPosition');
				});
			}
		}
	});
} else {

	//enable draggable icon
	$( function() {

		//setup movement position vars
		var start_pos = 0;
		var cur_pos = 0;
		var move_to = 0;
		var move_to_percent = 0;
		var pos_check = 0;
		var dir = 'center';
		var starting_place = 'center';

		//setup container sizes
		var container_width = $(window).width() / 2;
		var half_container_width = container_width/3;
		var three_quarter_width = (container_width/4)*3;
		var one_three_quarter_width = container_width - three_quarter_width;
		var body_wrapper_pos = parseFloat($('.body-wrapper').css("left"), 10);
		var controller_width = $('.location-controller').width();
		var from_view = '';

		// console.log('container_width: '+ container_width);

		//set width of loctation controller wrapper
		$('.controller-wrapper').css({
			"width" : (container_width * 2) - 50
		});

		//init draggable
		$( "#draggable" ).draggable({ 
			axis: "x",
			containment: "parent",
			start: function (event, ui ) {
				// do things before dragging starts
				$('.location-controller, .helper-text').removeClass('animate');
				$('.side-tag').addClass('hide');
				start_pos = ui.originalPosition.left;
				cur_pos = ui.position.left;
				pos_check = start_pos - cur_pos;
				body_wrapper_pos = parseFloat($('.body-wrapper').css("left"), 10);
				// console.log(':: START DRAG :: pos_check: '+pos_check+', start_pos: ' + start_pos + ', cur_pos: ' + cur_pos);
				
				//check what position user came from
				if ($('.body-wrapper.set-left').length > 0) {
					from_view = "Walker's Point";
					console.log(">>> from_view: "+from_view);
				} else if ($('.body-wrapper.set-right').length > 0) {
					from_view = 'Center Street';
					console.log(">>> from_view: "+from_view);
				} else {
					from_view = "Split View"
					console.log(">>> from_view: "+from_view);
				}
				
				//check if we are starting from the left/right stopping point
				if ($('.body-wrapper.set-left').length > 0) {	
					starting_place = 'left';
				} else if ($('.body-wrapper.set-left').length > 0) {
					starting_place = 'right';
				} else {
					starting_place = 'center';
				}
			},
			drag: function (event, ui ) {

				$('.helper-text').fadeOut(150);

				// document.ontouchmove = function(event){
				// 	console.log(event);
				// 	event.preventDefault();
				// }
				// do things while dragging
				start_pos = ui.originalPosition.left;
				cur_pos = ui.position.left;
				// console.log(ui);
				move_to = start_pos - cur_pos;
				//console.log(':: DRAGGIN :: >>> start_pos: ' + start_pos + ', cur_pos: ' + cur_pos +', move_to: '+move_to+', three_quarter_width: '+three_quarter_width);

				//check which direction we are moving the controller
				if (move_to > 0) {
					move_to = -move_to;
					dir = 'left';
				} else {
					move_to = -move_to;
					dir = 'right';
				}

				//add current body wrapper position to the amount we should move
				move_to = move_to+body_wrapper_pos;
				$('.body-container').scrollLeft(0);

				//run function to slide body-wrapper left or right
 				draggable_move(move_to, dir);
 				draggable_polygon(move_to);
				//console.log("::::::: end ::::::");
			},
			stop: function (event, ui) {

				$('.side-tag').removeClass('hide');

				event.stopPropagation();

				// document.ontouchmove = function(event){
				//    event.preventDefault();
				// }

				var ga_event_category = '';
					ga_event_action = 'Location drag';
				from_action = 'location_'+$('.body-wrapper').attr('data-action');

				// do things after dragging stops
				start_pos = ui.originalPosition.left;
				cur_pos = ui.position.left;
				pos_check = start_pos - cur_pos;

				//math out how to recenter
				recenter_controller = 0 - cur_pos;
				// console.log('recenter_controller: '+recenter_controller);

				//math out how much we need to still move to get to the left/right stopping point
				var finish_movement = (container_width-(controller_width/2)) - Math.abs(pos_check); 
				// console.log("finish: " + finish_movement + ", three_quarter: " + three_quarter_width);
				var distance_to_move = (container_width/3);
				// console.log("distance to move: " + distance_to_move);

				// store container left css values
				var left_container_distance = parseFloat($('.body-wrapper').css('left'), 10);
				var left_controller_distance = parseFloat($('#draggable').css('left'), 10);
				var left_logo_width = parseFloat($('.left-logo').css('width'), 10);
				var right_logo_width = parseFloat($('.right-logo').css('width'), 10);
				var controller_left_pos = parseFloat($('.location-controller').css('left'), 10);
				// console.log('left_container_distance: ' + left_container_distance + ' left_controller_distance: ' + left_controller_distance);


				var set_left_value = container_width - (controller_width/2);
				var to_distance = set_left_value - controller_left_pos;
				// console.log('move_left_amount: '+set_left_value);

				// console.log(':: END DRAG :: pos_check: '+pos_check+', start_pos: ' + start_pos + ', cur_pos: ' + cur_pos+', starting_place: '+starting_place+', distance_to_move: '+distance_to_move);
				// console.log('controller_left_pos: '+controller_left_pos);
				// if(controller_left_pos >= distance_to_move) {
				// 	console.log(':: *END DRAG :: moves left');
				// } else if (controller_left_pos <= -distance_to_move) { 
				// 	console.log(':: *END DRAG :: moves right');
				// } else {
				// 	console.log(':: *END DRAG :: moves center');
				// }

				// check if we should snap to the left or right
				if (controller_left_pos >= distance_to_move) {
					//snap to the left
					// console.log(':: END DRAG :: show center_street');
					// console.log('footer tag to_distance: '+to_distance);

					$('.body-wrapper, #draggable').animate({
						'left' : set_left_value
					}, 500).scrollLeft(0);
					// $('#draggable').animate({
					// 	'left' : set_left_value
					// }, 500);


					//mobile logo
					$('.left-logo').animate({
						'width' : +(left_logo_width+set_left_value)
					}, 500);
					$('.right-logo').animate({
						'width' : +(right_logo_width-set_left_value)
					}, 500);

					//footer address pos
					$('.cs-address').animate({
						'left' : +(left_container_distance+to_distance)
					}, 500);
					$('.wp-address').animate({
						'right' : -(left_container_distance+to_distance)
					}, 500);

					$('.body-wrapper').addClass('set-right').removeClass('set-left').attr('data-action', 'drag');
					$('.contain-drag').addClass('snapped snap-right').removeClass('snap-left');
					$(".byte-logo-carousel").slick('setPosition');
					ga_event_category = 'Select Center Street';
					modify_location_url ('center_street');
					// $('.section-nav, .fixed-logo').fadeOut();

				} else if (controller_left_pos <= -distance_to_move) {
					//snap to the right
					// console.log(':: END DRAG :: show walkers_point');
					
					to_distance = -set_left_value - controller_left_pos;
					// console.log('footer tag to_distance: '+to_distance);

					//set the left position 
					$('.body-wrapper, #draggable').animate({
						'left' : -set_left_value
					}, 500).scrollLeft(0);
					// $('#draggable').animate({
					// 	'left' : -set_left_value
					// }, 500);

					//mobile logo
					$('.left-logo').animate({
						'width' : +(left_logo_width-set_left_value)
					}, 500);
					$('.right-logo').animate({
						'width' : +(right_logo_width+set_left_value)
					}, 500);

					//footer address pos
					$('.cs-address').animate({
						'left' : +(left_container_distance+to_distance)
					}, 500);
					$('.wp-address').animate({
						'right' : -(left_container_distance+to_distance)
					}, 500);

					$('.body-wrapper').addClass('set-left').removeClass('set-right').attr('data-action', 'drag');
					$('.contain-drag').addClass('snapped snap-left').removeClass('snap-right');
					$(".byte-logo-carousel").slick('setPosition');
					ga_event_category = "Select Walker's Point";
					modify_location_url ('walkers_point');

					// $('.section-nav, .fixed-logo').fadeOut();
				} else {
					//revert to center
					// console.log(':: END DRAG :: moves center');
					$('.body-wrapper, #draggable, .cs-address').animate({
						'left' : 0
					}, 500).scrollLeft(0);
					// $('#draggable').animate({
					// 	'left' : 0
					// }, 500);

					//mobile logo
					$('.left-logo').animate({
						'width' : '50%'
					}, 500);
					$('.right-logo').animate({
						'width' : '50%'
					}, 500);

					//footer address pos
					// $('.cs-address').animate({
					// 	'left' : 0
					// }, 500);
					$('.wp-address').animate({
						'right' : 0
					}, 500);

					//remove content overlays
					$('.body-wrapper').removeClass('set-right set-left').attr('data-action', 'drag');
					$('.contain-drag').removeClass('snapped snap-left snap-right');
					$('.main-content .overlay').fadeOut();
					$(".byte-logo-carousel").slick('setPosition');
					// $('.section-nav, .fixed-logo').fadeIn();
					//$('.body-wrapper').css({"left" : "auto"});
					ga_event_category = 'Select Split View';
					modify_location_url ('remove_location');
				}
			ga_tracking (window.location.pathname, 'event', ga_event_category, ga_event_action, 'prev_location: '+from_view+', prev_action: '+from_action);
			}// end stop: function (event, ui) {
		});// end $( "#draggable" ).draggable({ 
	});// end $( function() {

}
	
//developer reset draggable function
function reset_draggable() {
	$('.body-wrapper, .location-controller').css({"left": 0});
	$('.main-content .overlay').fadeOut();
	$('.body-wrapper').removeClass('set-right set-left');
	$('.fixed-logo .left-logo, .fixed-logo .right-logo').css({"width" : '50%'});
	if ($(window).width() > 750) {
		$(".byte-logo-carousel").slick('setPosition');	
	}
}
//this function is called while dragging the location controller
function draggable_move (new_container_pos, dir) {

	var container_width = $(window).width() / 2;
	var controller_width = $('.location-controller').width();

	// add/remove overlay from content areas
	if (new_container_pos > 50) {
		$('.walkers-point .overlay').fadeIn();
	} else if (new_container_pos < -50) {
		$('.center-street .overlay').fadeIn();
	} else {
		$('.main-content .overlay').fadeOut();
		// console.log('*** remove overlay ***');
		//$('.center-street-container').css({"left" : -new_container_pos});
	}
	// if (new_container_pos > (container_width - (controller_width/2))) {
	// 	console.log('dragging too right: '+new_container_pos);
	// 	new_container_pos = container_width - (controller_width/2);
	// } else if (new_container_pos < -(container_width - (controller_width/2))) {
	// 	console.log('dragging too left: '+new_container_pos);
	// 	new_container_pos = container_width - (controller_width/2);
	// }
	
	//adjust site container to move left/right with the location controller
	$('.body-wrapper').css({"left" : new_container_pos});
	$(".byte-logo-carousel").slick('setPosition');

}

function draggable_polygon (move_amount) {
	var new_point = 50 + move_amount;
	var new_width = "calc(50% + "+move_amount+"px)";
	var new_width_right = "calc(50% - "+move_amount+"px)";
	$('.fixed-logo .left-logo').css({"width" : new_width});
	$('.fixed-logo .right-logo').css({"width" : new_width_right});

	//footer address pos
	$('.cs-address').css({'left' : move_amount});
	$('.wp-address').css({'right' : -move_amount});
	// $('#left_clip polygon').attr("points", "0 0, "+new_point+" 0, "+new_point+" 100, 100 100, 0 100");
	// $('#right_clip polygon').attr("points", new_point+" 0, 100 0, 100 100, "+new_point+" 100");
}

//swipe to choose location
function swipeLocation (event, direction) {
	$('.location-controller, .helper-text').removeClass('animate');
	if (direction == 'left') {
		// console.log('left swipe: walkers point');
		selectLocation ('right', 'swipe');
	} else if (direction == 'right') {
		// console.log('right swipe: center street');
		selectLocation ('left', 'swipe');
	}
}

$('.menu-button-space a').each( function(id, menu) {
	$(menu).click(function() {
		var menu_link = $(menu).attr('href');
			menu_text = $(menu).text();
		ga_tracking ('menu', 'event', 'menu pdf', menu_text+' menu click', menu_link);
		console.log("ga_tracking ('menu', 'event', 'menu pdf', '"+menu_text+" menu click', "+menu_link+");");
	});
});

//click to select location
function selectLocation (contentSide, hitType) {

	if (hitType == 'undefined' || hitType == null) {
		hitType = 'click';
	}
	if ($(window).width() <= 749 && $('.ui-draggable-dragging').length < 1) {
		// console.log(':: Location Controller Clicked or Body Swiped :: hitType = '+ hitType);
		

		//setup container sizes
		var container_width = $(window).width() / 2;
		var controller_width = $('.location-controller').width();

		// store container left css values
		var left_container_distance = parseFloat($('.body-wrapper').css('left'), 10);
		var left_controller_distance = parseFloat($('#draggable').css('left'), 10);
		var left_logo_width = parseFloat($('.left-logo').css('width'), 10);
		var right_logo_width = parseFloat($('.right-logo').css('width'), 10);

		//math out how much we need to still move to get to the left/right stopping point
		var finish_movement = (container_width-(controller_width/2)) - left_controller_distance;
		if (finish_movement == 0) {
			finish_movement = left_controller_distance*2;
		}

		//controller recenter
		recenter_controller = 0 - left_controller_distance;

		// console.log('finish_movement: '+finish_movement+', container_width: '+container_width+', controller_width: '+controller_width+', left_container_distance: '+left_container_distance+', left_controller_distance: '+left_controller_distance+', left_logo_width: '+left_logo_width+', right_logo_width:'+right_logo_width);

		var ga_event_category = '';
			ga_event_action = "Location "+hitType;
			from_view = '';
			if ($('.body-wrapper.set-right').length > 1) {
				from_view = "Walker's Point";
			} else if ($('.body-wrapper.set-left').length > 1) {
				from_view = 'Center Street';
			} else {
				from_view = "Split View"
			}
			from_action = 'location_'+$('.body-wrapper').attr('data-action');
			
			if ($('.set-right').length > 1 || $('.set-left').length > 1 ) {
				ga_event_action += " edge";
			} else if (contentSide == "center") {
				ga_event_action += " drag button";
			} else {
				ga_event_action += " screen";
			}
		
		
		if (contentSide == 'left' && $('.set-right').length < 1) {
			
			$('.helper-text').fadeOut(150);
			//snap to the right
			// console.log(':: Location Controller Clicked or Body Swiped:: Center Street');

			$('.center-street .overlay').fadeOut();
			$('.walkers-point .overlay').fadeIn();

			$('.body-wrapper').animate({
				'left' : +(left_container_distance+finish_movement)
			}, 500);
			$('#draggable').animate({
				'left' : +(left_controller_distance+finish_movement)
			}, 500);

			//mobile logo
			$('.left-logo').animate({
				'width' : +(left_logo_width+finish_movement)
			}, 500);
			$('.right-logo').animate({
				'width' : +(right_logo_width-finish_movement)
			}, 500);

			//footer address pos
			$('.cs-address').animate({
				'left' : +(left_container_distance+finish_movement)
			}, 500);
			$('.wp-address').animate({
				'right' : -(left_container_distance+finish_movement)
			}, 500);

			$('.body-wrapper').addClass('set-right').attr('data-action', hitType);
			$('.body-wrapper').removeClass('set-left');
			$('.contain-drag').addClass('snapped snap-right');
			$('.contain-drag').removeClass('snap-left');
			ga_event_category = 'Select Center Street';
			modify_location_url ('center_street');
		} else if (contentSide == 'right' && $('.set-left').length < 1) {
			
			$('.helper-text').fadeOut(150);
			// console.log(':: Location Controller Clicked or Body Swiped :: Walkers Point');

			$('.walkers-point .overlay').fadeOut();
			$('.center-street .overlay').fadeIn();

			$('.body-wrapper').animate({
				'left' : +(left_container_distance-finish_movement)
			}, 500);
			$('#draggable').animate({
				'left' : +(left_controller_distance-finish_movement)
			}, 500);

			//mobile logo
			$('.left-logo').animate({
				'width' : +(left_logo_width-finish_movement)
			}, 500);
			$('.right-logo').animate({
				'width' : +(right_logo_width+finish_movement)
			}, 500);

			//footer address pos
			$('.cs-address').animate({
				'left' : +(left_container_distance-finish_movement)
			}, 500);
			$('.wp-address').animate({
				'right' : -(left_container_distance-finish_movement)
			}, 500);

			$('.body-wrapper').addClass('set-left').attr('data-action', hitType);
			$('.body-wrapper').removeClass('set-right');
			$('.contain-drag').addClass('snapped snap-left');
			$('.contain-drag').removeClass('snap-right');

			ga_event_category = "Select Walker's Point";
			modify_location_url ('walkers_point');
		} else if (contentSide == 'center'){
			//revert to center
			// console.log(':: Location Controller Clicked or Body Swiped :: moves center');
			$('.body-wrapper').animate({
				'left' : left_container_distance+recenter_controller
			}, 500);
			$('#draggable').animate({
				'left' : left_controller_distance+recenter_controller
			}, 500);

			//mobile logo
			$('.left-logo').animate({
				'width' : '50%'
			}, 500);
			$('.right-logo').animate({
				'width' : '50%'
			}, 500);

			//footer address pos
			$('.cs-address').animate({
				'left' : 0
			}, 500);
			$('.wp-address').animate({
				'right' : 0
			}, 500);

			//remove content overlays
			$('.body-wrapper').removeClass('set-right set-left').attr('data-action', hitType);
			$('.contain-drag').removeClass('snapped snap-left snap-right');
			$('.main-content .overlay').fadeOut();
			
			ga_event_category = "Select Split View";
			modify_location_url ('remove_location');
		}
		ga_tracking (window.location.pathname, 'event', ga_event_category, ga_event_action, 'prev_location: '+from_view+', prev_action: '+from_action);
	}//end if window size
	else if (hitType == 'direct_url') {
		// console.log(':: Location Controller Clicked or Body Swiped :: no movement because window size too large or currently dragging');
		
		var ga_event_category = '';
			ga_event_action = "Location "+hitType;
			from_view = '';
			if ($('.body-wrapper.set-right').length > 1) {
				from_view = "Walker's Point";
			} else if ($('.body-wrapper.set-left').length > 1) {
				from_view = 'Center Street';
			} else {
				from_view = "Split View"
			}
			from_action = 'location_'+$('.body-wrapper').attr('data-action');
			
		if (contentSide == 'left' && $('.set-right').length < 1) {
			main_split.setSizes([75,25]);
			$('.walkers-point .overlay').fadeIn();
			$('.body-wrapper').addClass('set-right').removeClass('set-left').attr('data-action', hitType);
			ga_event_category = "Select Center Street";
			modify_location_url ('center_street');
		} else if (contentSide == 'right' && $('.set-left').length < 1) {
			main_split.setSizes([25,75]);
			$('.center-street .overlay').fadeIn();
			$('.body-wrapper').addClass('set-left').removeClass('set-right').attr('data-action', hitType);
			ga_event_category = "Select Walker's Point";
			modify_location_url ('walkers_point');
		} else if (contentSide == 'center') {
			$('.split .overlay').fadeOut();
			main_split.setSizes([50,50]);
			$('.body-wrapper').removeClass('set-right set-left').attr('data-action', hitType);
			ga_event_category = "Select Split View";
			modify_location_url ('remove_location');
		}
		ga_tracking (window.location.pathname, 'event', ga_event_category, ga_event_action, 'prev_location: '+from_view+', prev_action: '+from_action);
	}
}


/**
 * Copyright 2012, Digital Fusion
 * Licensed under the MIT license.
 * http://teamdf.com/jquery-plugins/license/
 * 
 * @demo
 * http://opensource.teamdf.com/visible/examples/demo-basic.html
 *
 * @author Sam Sehnert
 * @desc A small plugin that checks whether elements are within
 *		 the user visible viewport of a web browser.
 *		 only accounts for vertical position, not horizontal.
 */
$.fn.visible = function(partial){
	
    var $t				= $(this),
    	$w				= $(window),
    	viewTop			= $w.scrollTop(),
    	viewBottom		= viewTop + $w.height(),
    	_top			= $t.offset().top,
    	_bottom			= _top + $t.height(),
    	compareTop		= partial === true ? _bottom : _top,
    	compareBottom	= partial === true ? _top : _bottom;
	
	return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};
    

$.fn.followTo = function (pos) {
    var $this = this,
        $window = $(window);
        body_height = $('body').height();
        view_height = $(window).height();
        pos_offset_top = $(pos).offset().top;

        //amount to scroll before sticking to element top
        scroll_amount = (pos_offset_top - view_height) + 22.5;

    $window.scroll(function (e) {

    	//math out how far from the bottom we sould set our sticky footer at
    	var diff_1 = pos_offset_top - $(window).scrollTop(); //729
    		diff_2 = body_height - pos_offset_top; //185
    		diff_3 = diff_1 - diff_2; //544
    		diff_4 = view_height - diff_3; //248
    		new_pos = (diff_4 - diff_2) - 22.5; //63

        if ($window.scrollTop() > scroll_amount) {

	    	// console.log('window scroll pos: '+$window.scrollTop());
        	// console.log('new_pos: '+new_pos);
            $this.css({
                position: 'fixed',
                bottom: new_pos
            });
        } else {
            $this.css({
                position: 'fixed',
                bottom: '1em'
            });
        }
    });
};

$('.center-address').followTo('.center-hours');
$('.walker-address').followTo('.center-hours');
// $('.address-footer').followTo('.center-hours');

/*-------Add Mobile Menu JS Here---------- */

/*-------Add Calendar JS Here---------- */

/*-------Drawer campaign js------------ */

function toggle_drawer (elem_name) {
// 					console.log({"toggle_drawer":true});
	$('.content-drawer, .drawer-mobile-menu').toggleClass('open');
	$('#split_gutter, html').toggleClass('active-drawer');
// 					$('.content-drawer').toggleClass('disable-scrolling');
	
	//turn off/on autoplay
	if ($('.content-drawer.open').length > 0) {
		$('.tab-nav-wrapper').slick('slickPause');
		$('.main-content').click( function() {
			close_drawer();
			$('.main-content').unbind('click');
		});
		//current_page, hitType, eCat, eAction, eLabel
		ga_tracking (window.location.pathname, 'event', 'open drawer', 'drawer tab click', 'current drawer: '+elem_name);
	} else {
		$('.tab-nav-wrapper').slick('slickPlay');	
		$('.main-content').unbind('click');
	}
}
function close_drawer() {
	$('.content-drawer, .drawer-mobile-menu').removeClass('open');
	$('#split_gutter, html').removeClass('active-drawer');
	$('.tab-content').animate({
		scrollTop: 0
	}, 250);
	//turn off autoplay
	$('.tab-nav-wrapper').slick('slickPlay');
}
function select_drawer_tab (nextSlide) {
// 					console.log({"select_drawer_tab()":true, nextSlide:nextSlide});
	$('.tab-content').removeClass('highlighted');
	$('.tab-content[data-id="'+nextSlide+'"]').addClass('highlighted');

	$('.drawer-menu').slick('slickGoTo', nextSlide);
	
}

//prevent page scrolling
/*
document.ontouchmove = function ( event ) {
	console.log({"event.target":event.target});

};
*/

$( document ).ready(function() {
	drawer_sliders();
});

function drawer_sliders () {
	
	//create drawer-menu slider
	if ($('.drawer-menu').length > 0 && !$('.drawer-menu').hasClass('slick-initialized')) {	
		$('.drawer-menu').on('init', function (event, slick) {

			//change next/prev arrow text
			var nextText = $('.drawer-menu .tab-nav[data-slick-index="'+(slick.currentSlide+1)+'"]').text();
			var prevText = $('.drawer-menu .tab-nav[data-slick-index="'+(slick.currentSlide-1)+'"]').text();
			
			if (nextText != '') {
				$('.drawer-arrow.next').html('<p>Next: '+nextText+' <i class="fa fa-chevron-right" aria-hidden="true"></i></p>');
			} else {
				$('.drawer-arrow.next').html('');
			}
			if (prevText != '') {
				$('.drawer-arrow.prev').html('<p><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev: '+prevText+'</p>');
			} else {
				$('.drawer-arrow.prev').html('');
			}
			
			console.log({
				"init":"init",
				event:event,
				slick:slick,
				"next slide":(slick.currentSlide+1),
				"prev slide":(slick.currentSlide-1),
				nextText: nextText,
				prevText:prevText,
			});
		});
		$('.drawer-menu').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			centerMode: false,
			centerPadding: '60px',
			speed: 500,
			touchMove: false,
			dots: true,
			arrows: true,
			prevArrow: ".drawer-arrow.prev",
			nextArrow: ".drawer-arrow.next",
			autoplay: false,
			pauseOnHover: false,
			fade: false,
			variableWidth: true,
			responsive: [{
				breakpoint: 749,
					settings: 'unslick'
			}]
		});	
		$('.drawer-menu').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
// 								var slide_id = $(this).attr('id');
// 								console.log({slide_index:slide_index, slick:slick, direction:direction});
			// console.log($(this));
// 								$('.drawer-menu').slick('slickGoTo', slide_index);
			select_drawer_tab (nextSlide);

			//change next/prev arrow text
			var nextText = $('.drawer-menu .tab-nav[data-slick-index="'+(nextSlide+1)+'"]').text();
			var prevText = $('.drawer-menu .tab-nav[data-slick-index="'+(nextSlide-1)+'"]').text();
			
			if (nextText != '') {
				$('.drawer-arrow.next').html('<p>Next: '+nextText+' <i class="fa fa-chevron-right" aria-hidden="true"></i></p>');
			} else {
				$('.drawer-arrow.next').html('');
			}
			if (prevText != '') {
				$('.drawer-arrow.prev').html('<p><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev: '+prevText+'</p>');
			} else {
				$('.drawer-arrow.prev').html('');
			}
			
/*
			console.log({
				nextSlide:(nextSlide+1),
				prevSlide:currentSlide,
				nextText:nextText,
				prevText:prevText
			});
*/
		});
	}
							
	if ($('.tab-nav-wrapper').length > 0 && !$('.tab-nav-wrapper').hasClass('slick-initialized')) {		
		$('.tab-nav-wrapper').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			centerMode: false,
			centerPadding: '60px',
			speed: 500,
			touchMove: false,
			dots: true,
			arrows: false,
/*
			prevArrow: ".drawer-arrow.prev",
			nextArrow: ".drawer-arrow.next",
*/
			autoplay: true,
			pauseOnHover: false,
			fade: false,
			variableWidth: true,
			responsive: [{
				breakpoint: 749,
					settings: {
						infinite: true,
						centerMode: true,
						centerPadding: "125px",
						variableWidth: true,
						arrows: true
					}
			}]
		});
		$('.tab-nav-wrapper').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
// 								var slide_id = $(this).attr('id');
// 								console.log({slide_index:slide_index, slick:slick, direction:direction});
			// console.log($(this));
// 								$('.drawer-menu').slick('slickGoTo', slide_index);
			select_drawer_tab (nextSlide);

			//change next/prev arrow text
			var nextText = $('.drawer-menu .tab-nav[data-slick-index="'+(nextSlide+1)+'"]').text();
			var prevText = $('.drawer-menu .tab-nav[data-slick-index="'+(nextSlide-1)+'"]').text();
			
			if (nextText != '') {
				$('.drawer-arrow.next').html('<p>Next: '+nextText+' <i class="fa fa-chevron-right" aria-hidden="true"></i></p>');
			} else {
				$('.drawer-arrow.next').html('');
			}
			if (prevText != '') {
				$('.drawer-arrow.prev').html('<p><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev: '+prevText+'</p>');
			} else {
				$('.drawer-arrow.prev').html('');
			}
			
/*
			console.log({
				nextSlide:(nextSlide+1),
				prevSlide:currentSlide,
				nextText:nextText,
				prevText:prevText
			});
*/
		});
	}
	
	//image carousel slider
	if ($('.image-carousel').length > 0) {
		$('.image-carousel').each(function (i,v) {
			console.log({"image-carousel":v});
			if (!$(v).hasClass('slick-initialized')) {
/*
				$(v).on('init', function(event, slick) {
					console.log({"image-carousel init":true, slick:slick, event:event});
					var carousel_timer;
					
					var next_slide = slick.currentSlide+1;
					
					function cycle_images(carousel, next_slide) {
						clearTimeout(carousel_timer);
						console.log({"cycle_images":true, carousel:carousel, "carousel.currentSlide":carousel.currentSlide});
						
						var starting_count = carousel.slideCount
						
						$(carousel).slick('slickGoTo', next_slide);
						if (next_slide >= starting_count) {
							next_slide = 0;
						} else {
							next_slide++;
						}
						
						carousel_timer = setTimeout(cycle_images(carousel, next_slide), 1600);
					}
					
					cycle_images(slick.$slider[0], next_slide);
				});
*/
				$(v).slick({
					centerMode: true,
					infinite: true,
					centerPadding: "50px",
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: false,
					swipe: false,
					speed: 500,
					dots: false,
					arrows: true,
					autoplay: true,
					autoplaySpeed: 6500,
					pauseOnHover: false,
					fade: false,
					variableWidth: false,
					responsive: [{
/*
						breakpoint: 749,
							settings: {
								centerMode: false,
								touchMove: false,
								swipe: false
							}
*/
						breakpoint: 749,
							settings: "unslick"
					}]
				});	
			}
		});//end $('.featured-menu-slider').each(function (i,v)
	}
}//end drawer_sliders ()
/*
     FILE ARCHIVED ON 05:21:39 Mar 13, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:06:39 Dec 08, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 163.663 (3)
  esindex: 0.007
  captures_list: 204.596
  CDXLines.iter: 17.654 (3)
  PetaboxLoader3.datanode: 198.351 (5)
  exclusion.robots: 0.279
  exclusion.robots.policy: 0.26
  RedisCDXSource: 18.681
  PetaboxLoader3.resolve: 178.736 (3)
  load_resource: 323.843
*/