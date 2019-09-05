class Diaporama{
	constructor(cible){
		this.images = document.getElementsByClassName(cible);
		this.position = 0;
		this.afficherImage();
	}

	afficherImage(){
		for (var i = 0; i < this.images.length; i++) {
			this.images[i].style.display = "none";
		}
		this.images[this.position].style.display = "block";
	}

	afficherSuivant(){
		if (this.position < this.images.length-1 ){
			this.position++;
		}else {
			this.position=0;
		}
		this.afficherImage();	
	}
	afficherPrecedent(){
		if (this.position > 0)
		{ 
			this.position --;
		} else {
			this.position = this.images.length-1;
		}
		this.afficherImage();
	}

	afficherAuClick(event){ 
		
		if (event.target.getAttribute('id') === "precedent"){
			console.log(event.timeStamp);

			this.afficherPrecedent();

		} 
		if (event.target.getAttribute('id') === "suivant") { 
			
			this.afficherSuivant();
		}
		
	}
	demarrer(){
		return setInterval(this.afficherSuivant.bind(this),5000);
		//var interval = setInterval(function(){this.afficherImage;},1000);
	}


	infosClavier(event){
		console.log(event.KeyCode);
		if(event.keyCode === 39){

			this.afficherSuivant();
		}
		else if (event.keyCode === 37){
			this.afficherPrecedent();
		
		}
	}
}
/*carrousel.interval = setInterval(function(){carrousel.afficherImage();},1000);*/
var carrousel = new Diaporama("mySlides");
var interval = carrousel.demarrer();
/*var interval = setInterval(function(){
	carrousel.afficherSuivant();
},5000);
*/

document.getElementById("precedent").addEventListener("click",function(){
	carrousel.afficherAuClick(event);
});
document.getElementById("suivant").addEventListener("click",function(){
	carrousel.afficherAuClick(event)
});
document.getElementById("bouton_pause").addEventListener("click",function(){
	clearInterval(interval);
});
document.getElementById("bouton_play").addEventListener("click",function(){
	
	interval = carrousel.demarrer();
});

/*document.addEventListener("keyup", function(event){console.log(event.keyCode);
});	*/
document.addEventListener("keyup", function(){carrousel.infosClavier(event);
});	






mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';

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
	/*decrire (){
		var descriptif;
		descriptif =(this.address + ' ' + this.bikeStands + ' ' +this.availableBikeStands + ' ' + this.availableBikes + ' '  + this.status);
		return descriptif;
	}*/
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
		this.mapParam = {
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 13,
			center: [6.145533, 49.601652]
		};
		this.map = new mapboxgl.Map(this.mapParam);
	}
	addMarqueur (stationJCD){
		var marqueur= new Marqueur(stationJCD);
		this.tabMarqueur.push(marqueur);

	};
}
class JCDecauxConnector {
	constructor(URL){
		this.URL = URL;
		this.methode = 'GET';
		this.request = new XMLHttpRequest();
		this.request.responseType ='json';
	}
	sendRequest(){
		this.request.open(this.methode, this.URL);
		this.request.send()
	}
}
var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
var stationConnector = new JCDecauxConnector(requestURL);
stationConnector.sendRequest();


var myMap = new MapLuxembourg();


//    /* Appel API JC Decaux*/
//var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
//  /* requete*/
//var request = new XMLHttpRequest();
//  /*type de requete GET */
//request.open('GET', requestURL);
// /*type de reponse= JSON*/
//request.responseType = 'json';
//  /*envoie  requete*/
//request.send();
//  /*onload :*/

stationConnector.request.onload = function() {

	var stationsJCD = stationConnector.request.response;
	stationsJCD.forEach(function (stationJCD){	
		myMap.addMarqueur(stationJCD);
	})
	
	// add markers to map
	myMap.tabMarqueur.forEach(function(marqueur){
			
	   // create a HTML element for each feature
	   var el = document.createElement('div');
	   el.className = 'marker';
	   // make a marker for each feature and add it to the map
	   new mapboxgl.Marker(el).setLngLat(marqueur.coordinates).addTo(myMap.map);  
	   
	 
	   //new mapboxgl.Marker(el).setLngLat(marqueur.coordinates).setPopup(new mapboxgl.Popup({offset: 25}) // add popups
		//.setHTML('<h3>' + marqueur.station.name + '</h3><p>' + marqueur.station.address + '</br>' + marqueur.station.status + '</p>'))
		//.addTo(myMap.map);
   	});
}
/////////////////////////////////////////////



///Creation objet 


class Personne {
	constructor (nom, prenom, station){
		this.nom = nom;
		this.prenom = prenom;
		this.stationVelo = station;
	}
	Reserver (){

	}
	decrire(){
		var reservation = ("Vélo réservé à la station " + this.stationVelo + "par " + this.prenom + " " + this.nom);
		return decrire;

	}

}




