class MapLuxembourg {
    constructor() {
        this.tabMarqueur = [];
        this.mapParam = {
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13,
            center: [6.145533, 49.601652]
        };
        this.map = new mapboxgl.Map(this.mapParam);
        this.imagePath = "https://i.imgur.com/MK4NUzI.png";
    }
    addMarqueur(stationJCD) {
        var marqueur = new Marqueur(stationJCD);
        this.tabMarqueur.push(marqueur);
    }

    /*createClustor(){
    	var markerCluster = new MarkerClusterer(this.map, this.tabMarqueur,this.imagePath);
    }	*/
}