mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';
//mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';

class StationVelo {
	constructor(stationJCD){
		this.name = stationJCD.name;
		this.address = stationJCD.address;
		//this.position.lat = latJCD;
		//this.position.lng = lngJCD;
		this.bikeStands = stationJCD.bike_stands;
		this.availableBikeStands = stationJCD.available_bike_stands;
		this.availableBikes = stationJCD.available_bikesJCD;
		this.status = stationJCD.status;
	} 
	decrire (){
		var descriptif;
		descriptif =(this.address + ' ' + this.bikeStands + ' ' +this.availableBikeStands + ' ' + this.availableBikes + ' '  + this.status);
		return descriptif;
	}
}
class Marqueur {
	constructor(stationJCD){
		this.coordinates = [stationJCD.position.lng,stationJCD.position.lat];
		this.station = new StationVelo(stationJCD);
	}
}

class MapLuxembourg {
	constructor(){
		this.tabMarqueur = [];
	}
	addMarqueur (stationJCD){
		var marqueur= new Marqueur(stationJCD);
		this.tabMarqueur.push(marqueur);

	};
}


var myMap = new MapLuxembourg();

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
	var stationsJCD = request.response;
	stationsJCD.forEach(function (stationJCD){	
		myMap.addMarqueur(stationJCD);
		console.log('MAP IN:' + myMap);
	})
}

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [6.145533, 49.601652]
});
// add markers to map
console.log('MYMAP1 :' + myMap[1]);
console.log('MAP :' + myMap);
myMap.tabMarqueur.forEach(function(marqueur){	
   // create a HTML element for each feature
   var el = document.createElement('div');
   el.className = 'marker';
   // make a marker for each feature and add it to the map
	console.log('marqueur :' + marqueur.coordinates);
	console.log('name :' + marqueur.station.name );
	onsole.log('desc :' + marqueur.station.decrire() );
   new mapboxgl.Marker(el)
       .setLngLat(marqueur.coordinates)
       .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
           .setHTML('<h3>' + marqueur.station.name + '</h3><p>' + marqueur.station.decrire() + '</p>'))
       .addTo(map);
   });

