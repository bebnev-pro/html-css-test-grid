$(document).ready(function () {

	// for lazy loading images
	$(".lazy").lazyload({
		effect: "fadeIn"
	});

	// events for slider controls
	$('.controls span').on('click', function (event) {
		event.stopPropagation();
		var obj = $(this).parent().parent();
		sliderJS(obj, $(this).hasClass('next-slide') ? true : false);
	});

	// function for small slider
	function sliderJS(obj, direction) {
		var wrapper = $(obj).find(".slides");
		var item = $(wrapper).find('.slide');
		var step = $(item).width();
		var width = item.length * step;
		var direction = direction ? '1' : '-1';
		var margin = $(wrapper).css('margin-left').replace('px', '');
		if ((item.length > 1 && direction == -1 && (margin + step) <= 0) || (item.length > 1 && direction == 1 && ((margin - step * 2) + width) >= 0)) {
			$(wrapper).css('margin-left', margin - (direction * step));
		}
	}

	// trigger for masonry script
	var grid = $('.content').isotope({
		itemSelector: '.item',
		masonry: {
			columnWidth: 20
		}
	});

	// toggle of items size
	$('.item').on('click', function () {
		$(this).parent().find('.item').removeClass('active');
		$(this).addClass('active');
		grid.isotope('layout');
	});

	// filters trigger
	$('.filters__button').on('click', function () {
		$(this).parent().find('.filters__button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter-by');
		grid.isotope({
			filter: filterValue
		});
	});

	// video popup trigger
	$('.slide__icon_play').on('click', function (event) {
		event.stopPropagation();
		$('#cover').show().find('.video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/6AXjR7GH-wk" frameborder="0" allowfullscreen></iframe>');
	});

	// close popup
	$('.slide__icon_close').on('click', function () {
		$(this).parent().parent().hide().find('.video').html('');
	});

	// close popup by border-out click
	$(document).click(function (e) {
		if ($(e.target).closest('#videoScreen').length != 0) return false;
		$('#cover').hide().find('.video').html('');
	});

});