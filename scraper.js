$(document).ready(function() {
	$('#search-btn').click(function () {
		$.ajax({
			url: 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts/a_to_z/index.html',
			cache: false,
			success: function(data) {
				var links = [];
				for(var i = 0; i < 27; i++) {
					var nodeList = $("<div>").html(data)[0].getElementsByTagName('p')[i].getElementsByTagName('a');
					for (var j = 0; j < nodeList.length; j++) {
						var link = 'http://www.northwestern.edu/uservices/wildcard/advantage_discounts' + nodeList[j].href.slice(nodeList[j].href.indexOf('/businesses'));
						var title = nodeList[j].text;
						var business = {
							'title' : title,
							'link' : link
						}
						$.ajax({
							url: link,
							cache: false,
							success: function(data) {
								var scrape = $("<div>").html(data)[0].getElementsByTagName('div');
								var infoList = scrape[scrape.length - 6].getElementsByTagName('p');
								var addressInfo = infoList[0].childNodes;
								// console.log(infoList);
								// console.log(infoList.length);
								var infoCard = {
									'advantage' : scrape[scrape.length - 4].textContent,
									'address' : addressInfo[2].textContent + '\n' + addressInfo[4].textContent,
									'mapLink' : addressInfo[6].href,
									'phone' : infoList[1].textContent,
									'website' : infoList[2].textContent,
									'email' : infoList[3].textContent,
									// 'users' : infoList[infoList.length - 2].textContent
								}
								// console.log(addressInfo[6].attributes);
								business.info = infoCard;
								// console.log(business);
							}
						});
					 	links.push(business);
					}
				}
				console.log(links);
			}
		});
	});
});