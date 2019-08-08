
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [6.145533, 49.601652]

});

var tableauDorra = [];

    /* Appel API JC Decaux*/
var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
  /* requete*/
var request = new XMLHttpRequest();
  /*type de requete GET */
request.open('GET', requestURL);
  /*type de reponse= JSON*/
request.responseType = 'json';
  /*envoie  requete*/
request.send();
  /*onload :*/

request.onload = function() {
  var tableauStations = request.response;
    
  tableauStations.forEach(function(station){
    let lat = station.position.lat;
    let lng = station.position.lng;
    let tableauCoordinates = [lng, lat];
    let geometryTemp = { 
      type : "Point",
      coordinates :tableauCoordinates
    };
    let stationDest ={
      type : 'Feature',
      properties: {},
      geometry: geometryTemp
    };
    //placer stationDest dans tableauDorra
    tableauDorra.push(stationDest);
  })

}
  
map.on("load", function() {
	/* Image: An image is loaded and added to the map. */
	map.loadImage("https://i.imgur.com/MK4NUzI.png",function(error, image){
		if (error) throw error;
		map.addImage("custom-marker", image);
		/* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
		map.addLayer({
			id: "markers",
			type: "symbol",
			/* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
			source: {
				type: "geojson",
				data: {
					type: 'FeatureCollection',
					features : tableauDorra
				}
			},
			layout: {
				"icon-image": "custom-marker",
			}
		});
	});
});



class StationDest {
	constructor(lng,lat){
		this.type = "Feature";
		this.properties = "";
		this.geometry.type = "Point";
		this.geometry.coordinates = [lng,lat];

	}

	setCoordinates(lng,lat){
		this.geometry.coordinates[0] = lng;
		this.geometry.coordinates[1] = lat;
	}
}

//let newStation = new StationDest(-77.8091, 37.291);










