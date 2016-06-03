

$(document).ready(function() {

	$('.intro').hide().delay(1000).fadeIn(300);

	$('.start').on('click', function() {
		$('.intro').fadeOut(300);
		$('.quiz').delay(300).fadeIn(300);
	});

	$('.quiz__button').on('click', function() {
		$('.quiz').hide().delay(100).fadeIn(100);
	});

});