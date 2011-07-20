
function makeMap(X, Y, id, contentId) {
  var myLatlng = new google.maps.LatLng(X, Y);
  var myOptions = {
    zoom: 15,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById(id), myOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Офис продаж "Пегас Туристик"'
  });

  if ($('#' + contentId).length > 0 && $('#' + contentId).html() != '') {
    var infowindow = new google.maps.InfoWindow({
        content: $('#' + contentId).html()
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }
}
