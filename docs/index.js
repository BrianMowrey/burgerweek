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

    /**
    * Interpolate recipe details in an html block.
    */
    function createHtml(recipe) {
        
        const price = parseFloat(recipe.price).toLocaleString('en-CA', {style: 'currency', currency: 'CAD'});
        const address = recipe.location.address.replaceAll(',', '<br>');
        
        return `
        <div class="burger_info"><img src="images/burgers/resized/${recipe.id}.jpg">
            <div class="description">
                <h3 class="recipe-name">
                    ${recipe.name}
                </h3>
                <p class="recipe-description">
                    ${recipe.description}
                </p>
                <div class="row">
                    <div class="column">
                        <p class="restaurant">
                            <strong>
                                ${recipe.restaurant.name}
                            </strong>
                            <br>
                            ${address}
                        </p>
                    <a class="burgerweek" target="_blank" rel="noopener noreferrer" href="${recipe.urls.single}">
                        leburgerweek
                    </a>
                </div>
                <div class="column right">
                    Price:
                    <b> 
                        ${price} 
                    </b>
                <br>
                <a class="maps-link" target="_blank" rel="noopener noreferrer" href="${recipe.location.google_maps_url}">
                    map
                </a>
            </div>
        </div>  
        ` 
    }
    
    map.data.addListener('click', function(event) {
        var feat = event.feature;
        var recipe = feat.getProperty('recipe');
        
        const html = createHtml(recipe);

        infowindow.setContent(html);
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-34)});
        infowindow.open(map);
     });
  }
  
  window.initMap = initMap;
