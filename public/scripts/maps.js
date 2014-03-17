var latLngBounds = new google.maps.LatLngBounds();
var hardinHall = new google.maps.LatLng(42.050625, -87.679664);
var geocoder = new google.maps.Geocoder();
var i = 0;  //counter for the amount of markers for demo to be requested by geolocation
var markerCount = 0;  //counter for markers that successfully get set

//store addresses for demo
var addressArray = [
"527 Davis Street%20Evanston, IL 60201",  
"800 Dempster St.%20Evanston, IL 60202",    
"1724 Sherman Ave.%20Evanston, IL 60201",  
"928 Chicago Ave.%20Evanston, IL 60202",  
"1609 Sherman Avenue, Suite 208%20Evanston, IL 60201",

"915 Elmwood Ave.%20Evanston, IL 60202",  
"1322 Chicago Ave.%20Evanston, IL 60201",  
"907 1/2 Sherman Ave.%20Evanston, IL 60201",  
"924 Davis St.%20Evanston, IL 60201",  
"518 Davis St.%20Evanston, IL 60201",    

"1712 Sherman Ave. Alley%20Evanston, IL 60201",  
"1640 Orrington Ave%20Evanston, IL 60201",  
"737 Chicago Ave.%20Evanston, IL 60202",  
"719 Church Street%20Evanston, IL 60201",   
"1511 Sherman Ave.%20Evanston, IL 60201", 
]

var infoWindowContentsArray = [ //match the address arrays
"527 Cafe",
"2nd Hand Tunes",
"AAA Evanston",
"A And A Moley Vacuum Cleaning",
"Cold Stone Creamery",

"Acupuncture Access",
"Addis Abeba Restaurant",
"Revolution Spin",
"Affordable Portables",
"Todoroki Hibachi and Sushi",

"Alley Gallery",
"American Defensive Driving School",
"AMLI Evanston",  
"Flat Top Grill",
"Aylas Originals",
]

  var testString = 'test content';
  /*
   '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  */

var markerArray = new Array();// holds markers for all 20 addresses
var infoWindowArray = new Array();

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
      }, function() {
           handleNoGeolocation(true);
          });

    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

      /*
    if(document.cookie != ""){
      address = document.cookie;
      //console.log('The address is ' + document.cookie);
      //address stored in cookie
      codeAddress(document.cookie);
    }
    */



    
    intervalTimer = setInterval(function(){markerTimer()},400);
}

function markerTimer(){
  console.log(addressArray[i]);
  //add marker
  codeAddress(addressArray[i]);
  //add window to that marker
  //addWindow();
  i++;
  if( i >= addressArray.length){
    clearInterval(intervalTimer);
    console.log('timer called');
  }
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
      markerArray[markerCount] = new google.maps.Marker(geoMarker);

      //create an info window for this marker along with a click event
      addWindow();

      markerCount++;

      // add lat, lng to the bounds
      latLngBounds.extend(geoMarker.position);
    } else {
      var geoMarker = null;
      markerArray[markerCount] = new google.maps.Marker(geoMarker);
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addWindow() {
  //give each marker a window
  console.log('infowindows called' +markerCount);
  //add click events for each window
    console.log(markerArray[markerCount]!=null);
    if (markerArray[markerCount] != null){
      console.log("the marker arrya count is " + markerCount);
      var tempWindow = new google.maps.InfoWindow({
        content: infoWindowContentsArray[markerCount]
      });

      infoWindowArray[markerCount] = new google.maps.InfoWindow(tempWindow);
      //infoWindowArray[markerCount].open(map,markerArray[markerCount]);
      
      google.maps.event.addListener(markerArray[markerCount], 'click', callback(markerCount,map));


    }
    else {
      console.log("Marker null.  Can't add window at" + i);
    }
}

function callback(localMarkerCount,localMap){
    //callback function, force markerCount to be evaluated for listener function
    //instead of reference
    return function(){
      infoWindowArray[localMarkerCount].open(localMap,markerArray[localMarkerCount]);
    };
};



google.maps.event.addDomListener(window, 'load', initialize);

