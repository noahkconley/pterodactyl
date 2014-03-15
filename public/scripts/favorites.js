
$(document).ready(function() {
	for (i = 0; i <= 240; i++) {
		if (localStorage.getItem('business_' + i) != null) {

			$('#favlist').append('<li class="list-group-item">\n<img class="delete hidden" src="public/images/delete_button.png" alt="Delete"><a href="'+ localStorage.getItem('business_' + i + '_url') + '">\n<div class="row black">\n<div class="col-xs-8">\n<h4>'+ localStorage.getItem('business_' + i) + '</h6>\n</div>\n<div class="col-xs-4 desc">\n<h6>'+ localStorage.getItem('business_' + i + '_adv') + '</h5>\n</div>\n</div>\n</a>\n<div class="DeleteBox hidden">Delete</div></li>\n');
		}
	}
	if ($('li').length == 0)
		$('#favlist').after('<h4 style="text-align:center">Tap \"Add to Favorites\" on any business info screen to see it appear here');

	$('#edit').click(function(){
		//$(".delete").toggle(); //this isn't working for some reason...
		$(".delete").removeClass("hidden");
	})

	$(".delete").click(function(){
		$(".delete").addClass("hidden");
		$(".DeleteBox").removeClass("hidden");
	})

	$(".DeleteBox").click(function(){
		//remove this business from the browser cache
	})
});