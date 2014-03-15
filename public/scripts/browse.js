$(document).ready(function() {
	$.ajax({
		url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/a_to_z/index.html',
		cache: false,
		success: function(data) {
			var k = 0;
			for(var i = 0; i < 27; i++) {
				var nodeList = $("<div>").html(data)[0].getElementsByTagName('p')[i].getElementsByTagName('a');
				for (var j = 0; j < nodeList.length; j++) {
					var link = 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/businesses' + nodeList[j].href.slice(nodeList[j].href.lastIndexOf('/'));
					var title = nodeList[j].text;
					if (!(title.charAt(0) > 0))
						$('.panel-heading:contains(' + title.charAt(0) + ')').next('ul').append('<li class="list-group-item">' + title + '</li><input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input>');
					else
						//href="business.html"
						$('.panel-heading:first').next('ul').append('<li class="list-group-item">' + title + '</li><input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input>');
					k++;
				}
			}
		 	$('.row .col-xs-12:not(:has(li))').hide();
		}
	});
});

$(document).on('click', '.list-group-item', function() {
	$(this).next().attr('disabled', false);
	$('#gotobiz').trigger('click');
});