$(document).ready(function() {

	$('#catlist, #loclist, #wholist, #searchlist').hide();

	$('.list-group-item').click(function() {
		$(this).find('input').attr('disabled', false);
		$('#gotobiz').trigger('click');
	});

	$('#organize').change(function() {
		if ($(this).find(':selected').val() != 'search') {
			$('option[value="search"]').attr('disabled', true);
			var option = $(this).find(':selected').val();
			$('#abclist, #catlist, #loclist, #wholist, #searchlist, #abcselect, #catselect, #locselect, #whoselect').hide();
			$('#' + option + 'list, #' + option + 'select, #jump').show();
		}
	});

	$('#abcselect, #catselect, #locselect').change(function() {
		var option = $(this).find(':selected').text();
		var list = $(this).find(':selected').val();
		$('body').scrollTo($('#' + list + 'list .panel-heading:contains("' + option + '")'), 0);
	});

	$('#search-btn').click(function() {
		if ($('.form-control').val() != '') {
			$('#searchlist ul').empty();
			$('#abclist, #catlist, #loclist, #wholist, #abcselect, #catselect, #locselect, #whoselect, #jump').hide();
			$('#searchlist').show();
			var text = $('.form-control').val();
			var patt = new RegExp(text,'i');
			var i = 0;
			$('#abclist .list-group-item').each(function() {
				if (patt.test($(this).text())) {
					var item = $(this).clone();
					$('#searchlist ul').append(item);
					i++;
				}
			});
			$('#searchlist .panel-heading').html(i + ' search results');
			$('option[value="search"]').attr('disabled', false);
			$('#organize').val('search');
		}
	});

	$('.form-control').keyup(function() {
		if (event.which == 13)
			$('#search-btn').trigger('click');
	});
});

//abc ajax call
// $.ajax({
// 	url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/a_to_z/index.html',
// 	cache: false,
// 	success: function(data) {
// 		var k = 0;
// 		for(var i = 0; i < 27; i++) {
// 			var nodeList = $("<div>").html(data)[0].getElementsByTagName('p')[i].getElementsByTagName('a');
// 			for (var j = 0; j < nodeList.length; j++) {
// 				var link = 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/businesses' + nodeList[j].href.slice(nodeList[j].href.lastIndexOf('/'));
// 				//console.log(link);
// 				//getAddresses(link); //console log the addresses (only works on google maps linked addresses)
// 				var title = nodeList[j].text;
// 				if (!(title.charAt(0) > 0))
// 					$('#abclist .panel-heading:contains(' + title.charAt(0) + ')').next('ul').append('<li class="list-group-item">' + title + '<input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input></li>');
// 				else
// 					//href="business.html"
// 					$('#abclist .panel-heading:first').next('ul').append('<li class="list-group-item">' + title + '<input class="bizlink" name="business_' + k + '" type="url" value="' + link + '" style="display:none" disabled></input></li>');
// 				k++;
// 			}
// 		}
// 	},
// 	complete: function() {
// 	 	$('#abclist .row .col-xs-12:not(:has(li))').hide();
// 	 	// $('#catlist, #loclist').hide();
// 	 	getCategories();
// 	}
// });

function getAddresses(link) { //link is passed as string of individual page
	$.ajax({
		url: link,
		cache: false,
		success: function(data) {//do awesome stuff to log the address
			//console.log(data);
			//user $(this).attr("href");
			console.log("\"" + data.split("maps.google.com/?q=")[1].split('">')[0]+ "\",") ;
		}
	})
}
 function getCategories() {
 	$.ajax({
 		url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/category/index.html',
 		cache: false,
 		success: function(data) {
 			var nodeList = $("<div>").html(data)[0].getElementsByTagName('ul')[8];
 			for(var i = 0; i < 16; i++) {
 				link = nodeList.getElementsByTagName('a')[i].href;
 				link = 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/category' + link.slice(link.lastIndexOf('/'));
 				category = nodeList.getElementsByTagName('a')[i].textContent;
 				organizeCategory(link, category);
 			}
 		},
 		complete: function() {
 		 	$('#finishAjaxOne').attr('checked','checked');
 		 	fillCategory();
 		}
 	});
 }

 function organizeCategory(link, category) {
 	$.ajax({
 		url: link,
 		cache: false,
 		success: function(data) {
 			var string = category + ', ' + link + '\n';
 			var bizList = $("<div>").html(data)[0].getElementsByTagName('ul')[8];
 			var nameList = bizList.getElementsByTagName('a');
 			var userList = bizList.getElementsByTagName('span');
 			for (var j = 0; j < nameList.length; j++) {
 				name = nameList[j].textContent;
 				if (name.lastIndexOf(' - ') != -1) {
 					loc = name.substring(name.lastIndexOf(' - ') + 3, name.length);
 					loc = loc.trim();
					name = name.substring(0, name.lastIndexOf(' - '));
 				} else {
 					loc = 'Online';
 				}
 				name = name.trim();
 				string += name + ' = ';
 				string += '(' + $('.list-group-item:contains("' + name + '")').html() + ')\n';
 				$('.list-group-item:contains("' + name + '")').append('<span style="display:none">' + loc + '</span>');
 				$('.list-group-item:contains("' + name + '")').append('<span style="display:none">' + userList[j].textContent + '</span>');
 				$('.list-group-item:contains("' + name + '")').append('<span style="display:none">' + category + '</span>');
 			}
 		}
 	});
 }

// $('#catlist .panel-heading').each(function() {
// 	category = $(this).text();
// 	list = $('#abclist .list-group-item:contains("' + category + '")').clone();
// 	$(this).next('ul').append(list);
// });

// list = $('#abclist .list-group-item:not(:contains("Chicago"), :contains("Online"))').clone();
// $('.panel-heading:contains("Evanston")').next('ul').append(list);
// list = $('#abclist .list-group-item:contains("Chicago")').clone();
// $('.panel-heading:contains("Chicago")').next('ul').append(list);
// list = $('#abclist .list-group-item:contains("Online")').clone();
// $('.panel-heading:contains("Online")').next('ul').append(list);

// $(document).on('click', '.list-group-item', function() {
// 	$(this).find('input').attr('disabled', false);
// 	$('#gotobiz').trigger('click');
// });

// list = $('#abclist .list-group-item:not(:contains("student"), :contains("faculty"))').clone();
// $('.panel-heading:contains("All")').next('ul').append(list);
// list = $('#abclist .list-group-item:contains("students")').clone();
// $('.panel-heading:contains("Students")').next('ul').append(list);
// list = $('#abclist .list-group-item:contains("faculty")').clone();
// $('.panel-heading:contains("Faculty")').next('ul').append(list);