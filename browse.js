$(document).ready(function() {
	$.ajax({
		url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/a_to_z/index.html',
		cache: false,
		success: function(data) {
			for(var i = 0; i < 27; i++) {
				var nodeList = $("<div>").html(data)[0].getElementsByTagName('p')[i].getElementsByTagName('a');
				for (var j = 0; j < nodeList.length; j++) {
					var link = /*'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/businesses' + */nodeList[j].href.slice(nodeList[j].href.lastIndexOf('/') + 1, nodeList[j].href.length - 5);
					var title = nodeList[j].text;
					if (!(title.charAt(0) > 0))
						$('.panel-heading:contains(' + title.charAt(0) + ')').next('ul').append('<a class="list-group-item" href="business.html/?biz=' + link + '">' + title + '&</a>');
					else
						$('.panel-heading:first').next('ul').append('<a class="list-group-item" href="business.html/?biz=' + link + '">' + title + '</a><p style="display:none">' + link + '</p>');
				}
			}
		 	$('.row .col-xs-12:not(:has(a))').hide();
		}
	});
});
