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
    getInfo(biz);

    $('.collapseLink').click(function(){
        if (collapsed){
            $("#collapseOne").hide();
            $("#collapseTwo").show();
            $("#chevron").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        }
        else{
            $("#collapseTwo").hide();
            $("#collapseOne").show();
            $("#chevron").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        }
        collapsed = !collapsed;
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
    
    // $("#discount").click(function(){
    //     if (collapsed){
    //         $("#advantage").hide();
    //         $("#advantage1").show();
    //         $("#chevron").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    //     }
    //     else{
    //         $("#advantage1").hide();
    //         $("#advantage").show();
    //         $("#chevron").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    //     }
    //     collapsed = !collapsed;
    // });
    
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

function getInfo(biz) {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(biz)+
                "%22&format=xml'&callback=?",
        dataType: 'json',
        success: function(data) {
            $('#scrape').html(data.results[0]);
        },
        complete: function() {
            postInfo();
        }
    });
}

function postInfo() {
    text = $('#scrape .content').text().trim().split('\n\n');
    title = text[0];
    contact = text[1];
    users = text[text.length-1];
    $('.head-text').text(title.split('\n')[0]);

    if (contact.indexOf('Address:') > -1) {
        address = contact.split('\n');
        $('#address').html(address[1] + '<br>' + address[2] + '<br>' + address[3]);
    } if (contact.indexOf('Phone:') > -1) {
        contact = contact.slice(contact.indexOf('Phone:'));
        $('#phone').text(contact.split('\n')[0]);
    } if (contact.indexOf('Web Site:') > -1) {
        contact = contact.slice(contact.indexOf('Web Site:'));
        $('#website').text(contact.split('\n')[0]);
    } if (contact.indexOf('Email:') > -1) {
        contact = contact.slice(contact.indexOf('Email:'));
        $('#email').text(contact.split('\n')[0]);
    } 

    if (users.indexOf(': Yes') == 18) {
        if (users.lastIndexOf(': Yes') == 140)
            $('#usergroup').html('Available for: All Cardholders');
        else
            $('#usergroup').html('Available for: Students Only');
    } else
        $('#usergroup').html('Available for: Faculty Only');

    var advContent = $('#scrape div:eq(26)').html();
    if (advContent.length > 48) {
        adv1 = advContent.substring(0, 48) + "...";
        $('#advantage').html(adv1);
        $('#advantage1').html(advContent);
    } else {
        $('#advantage').html(advContent);
        $('#chevron').hide();
    }

    $('#marker').prop('alt', $('#scrape a:contains("map")').attr('href'));
}
