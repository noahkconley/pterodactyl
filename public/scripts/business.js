$(document).ready(function(){

    var url = document.URL;
    var ref = url.substring(url.indexOf('?') + 1, url.indexOf('='));
    if (localStorage.getItem(ref) != null)
        $('#favorite').text('Remove from Favorites');

    /*
    $("#locate-business").click(function(){
        document.cookie = 'paneracookie=test'
    });
    */
    var biz = decodeURIComponent(document.location);
    biz = biz.slice(biz.indexOf('=')+1);
    $.ajax({
        url: biz,
        cache: false,
        success: function(data) {
            var scrape = $("<div>").html(data)[0].getElementsByTagName('div');
            $('.head-text').html(scrape[22].getElementsByTagName('h2')[0].textContent);
            var infoList = scrape[scrape.length - 6].getElementsByTagName('p');
            var users = scrape[scrape.length - 5].lastChild.textContent;
            // console.log(scrape[scrape.length - 4])

            var advContent = scrape[scrape.length - 4].innerHTML;
            if (advContent.length > 48)
                adv1 = advContent.substring(0, 48) + "..."    

            $('#advantage').html(adv1);
            $('#advantage1').html(advContent);

            for (var k = 0; k < infoList.length; k++) {
                var current = infoList[k].textContent;
                if (current.indexOf('Address:') > -1) {
                    var addressInfo = infoList[k].childNodes;
                    $('#address').html('Address:<br>' + addressInfo[2].textContent + '<br>' + addressInfo[4].textContent);
                    $('#marker').prop('alt', addressInfo[6].href);
                }
                else if (current.indexOf('Phone:') > -1)
                    $('#phone').html(infoList[k].textContent);
                else if (current.indexOf('Web Site:') > -1)
                    $('#website').html(infoList[k].textContent);
                else if (current.indexOf('Email:') > -1)
                    $('#email').html(infoList[k].textContent);
            }
            if (users.indexOf(': Yes') == 18) {
                if (users.lastIndexOf(': Yes') == 161)
                    $('#usergroup').html('Available for: All Cardholders');
                else
                    $('#usergroup').html('Available for: Students Only');
            } else
                $('#usergroup').html('Available for: Faculty Only');
        }
    });

    $("#DiscountToggle").click(function(){
                $("collapseOne").hide();
            });

    $('#marker').click(function () {
        $.ajax({
            url: $(this).prop('alt'),
            cache: false,
            success: function() {
                console.log(this.url);
            }
        });
    });

    var collapsed = true;
    
    $("#discount").click(function(){
        if (collapsed){
            $("#advantage").hide();
            $("#advantage1").show();
            $("#chevron").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }
        else{
            $("#advantage1").hide();
            $("#advantage").show();
            $("#chevron").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }
        collapsed = !collapsed;
    });
    
    $("#set").click(function(){
        alert("Your reminder has been set!");
        $("#remind").click();
    });

    $("#favorite").click(function(){
        if ($(this).text() == 'Add to Favorites') {
            $(this).text('Remove from Favorites');
            url = document.URL;
            ref = url.substring(url.indexOf('?') + 1, url.indexOf('='));
            title = $('.head-text').text();
            adv = $('#advantage').text();
            if (adv.length > 50)
                adv = adv.substring(0, 50) + '...'
            localStorage.setItem(ref, title);
            localStorage.setItem(ref + '_url', url);
            localStorage.setItem(ref + '_adv', adv);
        } else {
            $(this).text('Add to Favorites');
            localStorage.removeItem(ref);
            localStorage.removeItem(ref + '_url');
            localStorage.removeItem(ref + '_adv');
        }
    });
});