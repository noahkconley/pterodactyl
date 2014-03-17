var latLngBounds = new google.maps.LatLngBounds();
var hardinHall = new google.maps.LatLng(42.050625, -87.679664);
var geocoder = new google.maps.Geocoder();
var i = 0;
var addressArray = [
"527 Davis Street%20Evanston, IL 60201",  
"800 Dempster St.%20Evanston, IL 60202",  
"3500 W. Dempster St.%20Evanston, IL 60201",  
"1724 Sherman Ave.%20Evanston, IL 60201",  
"928 Chicago Ave.%20Evanston, IL 60202",  
"1609 Sherman Avenue, Suite 208%20Evanston, IL 60201", 
"915 Elmwood Ave.%20Evanston, IL 60202",  
"1322 Chicago Ave.%20Evanston, IL 60201",  
"907 1/2 Sherman Ave.%20Evanston, IL 60201",  
"924 Davis St.%20Evanston, IL 60201",  
"518 Davis St.%20Evanston, IL 60201",  
"2114 Central St.%20Evanston, IL 60201",  
"1712 Sherman Ave. Alley%20Evanston, IL 60201",  
"1640 Orrington Ave%20Evanston, IL 60201",  
"737 Chicago Ave.%20Evanston, IL 60202",  
"719 Church Street%20Evanston, IL 60201",  
"826 Noyes Street%20Evanston, IL 60201", 
"160 E .Huron St.%20Chicago, IL, IL 60611",  
"1511 Sherman Ave.%20Evanston, IL 60201",  
"1212 Sherman Ave.%20Evanston, IL 60202", ]
var markerArray = new Array();// holds markers for all 20 addresses

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
      center: hardinHall,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: locateStyle
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


    var H = window.innerHeight - 110;
    H = H+"px";
    document.getElementById("map-canvas").style.height=H;

    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geoPos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      latLngBounds.extend(geoPos);

      var geoInfowindow = new google.maps.InfoWindow({
        map: map,
        position: geoPos,
        content: 'You are here.'
      });
      map.setCenter(geoPos);

      //map.setCenter(geoPos);
        }, function() {
           handleNoGeolocation(true);
          });

    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

    if(document.cookie != ""){
      address = document.cookie;
      //console.log('The address is ' + document.cookie);
      //address stored in cookie
      codeAddress(document.cookie);
    }


    //begin drawing markers on map
    /*
    for(var i = 0; i<addressArray.length; i++){
      codeAddress(addressArray[i]); //encode URI maybe?
    }
    */
    /*
    delayLoop();
    */
    
    var intervalTimer = setInterval(function(){markerTimer()},500);

    //map.fitBounds(latLngBounds);
}
/*
function delayLoop() {
  setTimeout(function(){
    codeAddress(addressArray[i]); //encodeuri maybe?
    i++;
    console.log(addressArray.length);
    console.log(addressArray[i]);
    if( i < addressArray.length) delayLoop;
  }, 300)
}
*/
function markerTimer(){
  if( i >= addressArray.length){
    clearInterval(intervalTimer);
    return;
  }
  console.log(addressArray[i]);
  console.log(i);
  codeAddress(addressArray[i]);
  i++;
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'You are here.';
  } else {
    var content = 'You are here.';
  }

  var options = {
    map: map,
    position: hardinHall,  //default position for demo
    content: content
  };

  var geoInfowindow = new google.maps.InfoWindow(options);

  latLngBounds.extend(hardinHall);
  map.setCenter(hardinHall);
}

function codeAddress(address) {

  geocoder.geocode( { 'address': decodeURI(address)}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //map.setCenter(results[0].geometry.location);
      var geoMarker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      //add the geomarker to the markerArray
      markerArray.push(geoMarker);
      // add lat, lng to the bounds
      latLngBounds.extend(geoMarker.position);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}


google.maps.event.addDomListener(window, 'load', initialize);

