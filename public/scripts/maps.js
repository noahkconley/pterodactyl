function initialize() {
    //coordinates for panera bread (map will center to this as well)
    var paneraBreadLatLng = new google.maps.LatLng(42.0486, -87.6821);
    var andysLatLng = new google.maps.LatLng(42.04855, -87.6814);
    var coldstoneLatLng = new google.maps.LatLng(42.04745, -87.6816);

    //remove all local listings (default setting on google maps)
    var locateStyle = [
        {
                featureType:"poi",
                elementType:"labels",
                stylers: [
                    { visibility: "off"}
                ]
        }
    ];

    var mapOptions = {
      center: paneraBreadLatLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: locateStyle
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    //this string is passed to the info box when it opens
    //it takes html stuff, and is stylized by main.css
    var paneraInfoWindowString = 
      '<div id="content">'+
      '<h4>Panera Bread</h4>'+
      '<div id="windowBodyContent" style="width:150px">'+
      '<p>'+
      '10% off any purchase'+
      '</p>'+
      '<a href="business.html">'+
      'More Information</a> '+
      '</div>'+
      '</div>';

    var andysInfoWindowString = 
      '<div id="content">'+
      "<h4>Andy's Frozen Custard</h4>"+
      '<div id="windowBodyContent" style="width:150px">'+
      '<p>'+
      '15% off any purchase'+
      '</p>'+
      '<a href="business.html">'+
      'More Information</a> '+
      '</div>'+
      '</div>';

    var coldstoneInfoWindowString = 
      '<div id="content">'+
      "<h4>Coldstone Creamery</h4>"+
      '<div id="windowBodyContent" style="width:150px">'+
      '<p>'+
      '15% off any cup or cone'+
      '</p>'+
      '<a href="business.html">'+
      'More Information</a> '+
      '</div>'+
      '</div>';

    var paneraWindow =  new google.maps.InfoWindow({
        content: paneraInfoWindowString
    });
    var andysWindow = new google.maps.InfoWindow({
        content: andysInfoWindowString
    });
    var coldstoneWindow = new google.maps.InfoWindow({
        content: coldstoneInfoWindowString
    });

    //last marker used to record the ast marker opened so that
    //the other marker closes upon opening another one
    var lastWindow; //= andysWindow;

    var marker = new google.maps.Marker({
      position: paneraBreadLatLng,
      map: map,
      title: 'Panera Bread'
    });
    var marker1 = new google.maps.Marker({
      position: andysLatLng,
      map: map,
      title: "Andy's Frozen Custard"
    });
    var marker2 = new google.maps.Marker({
      position: coldstoneLatLng,
      map: map,
      title: "Coldstone Creamery"
    });

    var H = window.innerHeight - 110;
    H = H+"px";
    document.getElementById("map-canvas").style.height=H;

    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geoPos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var geoInfowindow = new google.maps.InfoWindow({
        map: map,
        position: geoPos,
        content: 'You are here.'
      });

      map.setCenter(geoPos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'You are here.';
  } else {
    var content = 'You are here.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(42.050625, -87.679664),
    content: content
  };

  var geoInfowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
    
    //click listener for opening panera info window
    google.maps.event.addListener(marker, 'click', function(){
        paneraWindow.open(map,marker);
        //andysWindow.close();
        //coldstoneWindow.close();
        if (lastWindow != null) lastWindow.close();
        lastWindow = paneraWindow;
    });
    google.maps.event.addListener(marker1, 'click', function(){
        andysWindow.open(map,marker1);
        //paneraWindow.close();
        //coldstoneWindow.close();
        if (lastWindow != null)lastWindow.close();
        lastWindow = andysWindow;
    });
    google.maps.event.addListener(marker2, 'click', function(){
        coldstoneWindow.open(map,marker2);
        //andysWindow.close();
        //paneraWindow.close();
        if (lastWindow != null)lastWindow.close();
        lastWindow = coldstoneWindow;
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

    