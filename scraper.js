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
								// console.log(scrape);
								var infoList = scrape[scrape.length - 6].getElementsByTagName('p');
								var users = scrape[scrape.length - 5].lastChild.textContent;
								var infoCard = new Object();
								infoCard.advantage = scrape[scrape.length - 4].textContent;
								// console.log(users);
								// console.log(users.length);
								// console.log(users.indexOf(': Yes'));
								// console.log(users.lastIndexOf(': Yes'));
								for (var k = 0; k < infoList.length; k++) {
									var current = infoList[k].textContent;
									if (current.indexOf('Address:') > -1) {
										var addressInfo = infoList[k].childNodes;
										infoCard.address = addressInfo[2].textContent + '\n' + addressInfo[4].textContent;
										infoCard.mapLink = addressInfo[6].href;
									}
									else if (current.indexOf('Phone:') > -1)
										infoCard.phone = infoList[k].textContent;
									else if (current.indexOf('Web Site:') > -1)
										infoCard.website = infoList[k].textContent;
									else if (current.indexOf('Email:') > -1)
										infoCard.email = infoList[k].textContent;
								}
								// console.log(infoCard);
								// console.log(addressInfo[6].attributes);
								if (users.indexOf(': Yes') == 18) {
									if (users.lastIndexOf(': Yes') == 161)
										infoCard.userGroup = 'All Cardholders';
									else
										infoCard.userGroup = 'Students Only';
								} else
									infoCard.userGroup = 'Faculty Only';
								// console.log(infoCard.userGroup);
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