// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    
    const winnipeg = { lat: 49.899754, lng: -97.137494};

    var infowindow = new google.maps.InfoWindow();
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: winnipeg,
    });
    // The marker, positioned at Uluru
    /*
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
    */
    map.data.setStyle(function(feature) {
        //var ascii = feature.getProperty('ascii');
        //var color = ascii > 91 ? 'red' : 'blue';
        return {
          //fillColor: color,
          //strokeWeight: 1
          icon: 'images/hamburger64.png'
        };
    });
    map.data.loadGeoJson('burgerweek_geo.json');
    map.data.addListener('click', function(event) {
        var feat = event.feature;
        var recipe = feat.getProperty('recipe');
        
        console.log('recipe=%o', recipe)
        var html = '<img src="images/burgers/resized/' + recipe.id + '.jpg" align="left">';
        html += "<b>"+recipe.name+"</b><br>"+recipe.description;
        html += "<br>" + recipe.restaurant.name;
        html += "<br>" + recipe.location.address;
        html += "<br><a class='normal_link' rel='noreferrer' href='"+recipe.urls.single+"'>leburgerweek</a>";
        infowindow.setContent(html);
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-34)});
        infowindow.open(map);
     });
  }
  
  window.initMap = initMap;
