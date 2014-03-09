function initialize() {
//coordinates for panera bread (map will center to this as well)
var paneraBreadLatLng = new google.maps.LatLng(42.0483, -87.68225);

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

var paneraWindow =  new google.maps.InfoWindow({
    content: paneraInfoWindowString
});

if(document.cookie === 'paneracookie=test'){
  var marker = new google.maps.Marker({
      position: paneraBreadLatLng,
      map: map,
      title: 'Panera Bread'
  });
}

var H = window.innerHeight - 134;
H = H+"px";
document.getElementById("map-canvas").style.height=H;

//click listener for opening panera info window
google.maps.event.addListener(marker, 'click', function(){
    paneraWindow.open(map,marker);
});
}

google.maps.event.addDomListener(window, 'load', initialize);

    