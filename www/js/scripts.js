function setSliderHeight(){
	var above = $('.slider').offset().top;
	var windowHeight = $(window).innerHeight();
	$('.slider').height(windowHeight - above - 49); //49 is the offset required for the tabs
}
