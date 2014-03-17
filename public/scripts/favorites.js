$(document).ready(function() {
	for (i = 0; i <= 240; i++) {
		if (localStorage.getItem('business_' + i) != null) {
			$('#favlist').append('<li class="list-group-item row">\n<div class="dels no-padding"><img id="dButton'+i+'" class="delete" src="public/images/delete_button.png" alt="Delete"><button id="dBoxdButton'+i+'" class="DeleteBox purple">Sure?</button></div><a class="rest col-xs-12 row no-padding" href="'+ localStorage.getItem('business_' + i + '_url') + '">\n\n<div class="col-xs-8 black">\n<h4>'+ localStorage.getItem('business_' + i) + '</h4>\n</div>\n<div class="col-xs-4 desc black">\n<h6>'+ localStorage.getItem('business_' + i + '_adv') + '</h6>\n</div>\n</a>\n</li>\n');
		}
	}

	if ($('li').length == 0)
		$('#favlist').after('<h4 style="text-align:center">Tap \"Add to Favorites\" on any business info screen to see it appear here');


	$(".delete").hide();
	$(".DeleteBox").hide();
	$("#done").hide();

	$("#edit").click(function(){
		$(".delete").toggle();
		$("#edit").hide();
		$("#done").show();
        $(".dels").addClass("col-xs-1");
        $(".rest").removeClass("col-xs-12").addClass("col-xs-11");
	})

	$("#done").click(function(){
		$("#edit").show();
		$("#done").hide();
		$(".delete").hide();
		$(".DeleteBox").hide();
        $(".dels").removeClass("col-xs-1")
        $(".rest").removeClass("col-xs-11").addClass("col-xs-12");
	})

	$(".delete").click(function(){
		$("#"+this.id).toggle();
		$("#dBox"+this.id).toggle();
	})

	$(".DeleteBox").click(function(){
        var id = $(this).attr('id');
        var index = id.substr(id.length - 3);
        while (index.charAt(0) === "o" || index.charAt(0) === "n"){
            index = index.substr(1);   
        }
        
        localStorage.removeItem('business_' + index);
        localStorage.removeItem('business_' + index + '_url');
        localStorage.removeItem('business_' + index + '_adv');
        location.reload();
	})
});