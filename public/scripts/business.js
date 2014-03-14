$(document).ready(function(){
    var collapsed = true;

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
            $('#advantage').html(scrape[scrape.length - 4].innerHTML);
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
                    $('#usergroup').html('All Cardholders');
                else
                    $('#usergroup').html('Students Only');
            } else
                $('#usergroup').html('Faculty Only');
        }
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

    $("#discount").click(function(){
        if (collapsed)
            $("#chevron").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");   
        else
            $("#chevron").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");

        collapsed = !collapsed;
    });
    
    $("#set").click(function(){
        alert("Your reminder has been set!");
        $("#remind").click();
    });
});