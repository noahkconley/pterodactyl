$(document).ready(function() {

	//abc ajax call
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
						$('#abclist .panel-heading:contains(' + title.charAt(0) + ')').next('ul').append('<li class="list-group-item">' + title + '</li><input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input>');
					else
						//href="business.html"
						$('#abclist .panel-heading:first').next('ul').append('<li class="list-group-item">' + title + '</li><input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input>');
					k++;
				}
			}
		 	$('#abclist .row .col-xs-12:not(:has(li))').hide();
		}
	});

	//catageory ajax call
	$.ajax({
		url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/category/index.html',
		cache: false,
		success: function(data) {
			var nodeList = $("<div>").html(data)[0].getElementsByTagName('ul')[8];
			// for(var i = 0; i < 16; i++) {
				link = nodeList.getElementsByTagName('a')[0].href;
				link = 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/category' + link.slice(link.lastIndexOf('/'));
				category = nodeList.getElementsByTagName('a')[0].textContent;

				$.ajax({
					url: link,
					cache: false,
					success: function(data) {
						var bizList = $("<div>").html(data)[0].getElementsByTagName('ul')[8];
						var nameList = bizList.getElementsByTagName('a');
						var userList = bizList.getElementsByTagName('span');
						for (var j = 0; j < nameList.length; j++) {
							name = nameList[j].textContent.substring(0, nameList[j].textContent.lastIndexOf(' - ')).trim();
							biz = $('.list-group-item:contains("' + name + '")');
							biz.append('<span>' + category + '</span>');
							biz.append('<span>' + userList[j].textContent + '</span>');
						}
					}
				});

				console.log($('.list-group-item:contains("' + category + '")'));
				// $('.list-group-item:contains("' + category + '") + input').clone().appendTo('.panel-heading:contains("' + category + '")');
			// }
		}
	});
});

$(document).on('click', '.list-group-item', function() {
	$(this).next().attr('disabled', false);
	$('#gotobiz').trigger('click');
});