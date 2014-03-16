
$(document).ready(function() {
	for (i = 0; i <= 240; i++) {
		if (localStorage.getItem('business_' + i) != null) {
			$('#favlist').append('<li class="list-group-item">\n<img id="dButton'+i+'" class="delete" src="public/images/delete_button.png" alt="Delete"><a href="'+ localStorage.getItem('business_' + i + '_url') + '">\n<div class="row black">\n<div class="col-xs-8">\n<h4>'+ localStorage.getItem('business_' + i) + '</h4>\n</div>\n<div class="col-xs-4 desc">\n<h6>'+ localStorage.getItem('business_' + i + '_adv') + '</h6>\n</div>\n</div>\n</a>\n<div id="dBoxdButton'+i+'" class="DeleteBox">Delete</div></li>\n');
		}
	}


	if ($('li').length == 0)
		$('#favlist').after('<h4 style="text-align:center">Tap \"Add to Favorites\" on any business info screen to see it appear here');


	$(".delete").hide();
	$(".DeleteBox").hide();

	$('#edit').click(function(){
		$(".delete").toggle();
	})

	$(".delete").click(function(){
		$(this.id).toggle(); //not working
		$("#dBox"+this.id).toggle();
	})

	$(".DeleteBox").click(function(){
		//remove this business from the browser cache
	})
});