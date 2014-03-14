$(document).ready(function() {
	for (i = 0; i <= 240; i++) {
		if (localStorage.getItem('business_' + i) != null) {
			$('#favlist').append('<li class="list-group-item">\n<a href="'+ localStorage.getItem('business_' + i + '_url') + '">\n<div class="row black">\n<div class="col-xs-8">\n<h4>'+ localStorage.getItem('business_' + i) + '</h4>\n</div>\n<div class="col-xs-4">\n<h5>'+ localStorage.getItem('business_' + i + '_adv') + '</h5>\n</div>\n</div>\n</a>\n</li>\n');
		}
	}
	if ($('li').length == 0)
		$('#favlist').after('<h4 style="text-align:center">Tap \"Add to Favorites\" on any business info screen to see it appear here');
});