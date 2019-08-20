



mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';

class StationVelo {
	constructor(nameJCD,adressJCD,latJCD,lngJCD,bikeStandsJCD,availableBikeStandsJCD,availableBikesJCD,statusJCD){
		this.name = nameJCD;
		this.adress = adressJCD;
		this.position = {
			lat : latJCD,
			lng : lngJCD
		};
		//this.position.lat = latJCD;
		//this.position.lng = lngJCD;
		this.bikeStands = bikeStandsJCD;
		this.availableBikeStands = availableBikeStandsJCD;
		this.availableBikes = availableBikesJCD;
		this.status = statusJCD;
	}
}


class Marqueur {
	constructor(lng,lat,description){
		this.type = 'Feature';
		//this.geometry.type = 'Point';
		this.geometry = {
			coordinates : [lng,lat],
			type : 'Point'
		};
		//this.geometry.coordinates = [lng,lat];
		this.properties ={
			title : 'Mapbox',
			description : description
		};
		//this.properties.title = 'Mapbox';
		//this.properties.description =description;
	}
}
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [6.145533, 49.601652]
});
var tableauMarqueur = [];

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
  	var myStation = new StationVelo(station.name,station.address,station.position.lat,station.position.lng,station.bike_stands,station.available_bike_stands,station.available_bikes,station.status);
  	/*instantiation objet marqueur avec les infos de la station en cours*/
  	var myMarqueur = new Marqueur (station.position.lng,station.position.lat,station.name);
  	//placer myMarqueur dans tableauMarquer
    tableauMarqueur.push(myMarqueur);
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
					features : tableauMarqueur
				}
			},
			layout: {
				"icon-image": "custom-marker",
			}
		});
	});
});



