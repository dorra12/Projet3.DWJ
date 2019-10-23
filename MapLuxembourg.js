class MapLuxembourg {
    constructor() {
        this.tabMarqueur = [];
        this.mapParam = {

            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 12,
            center: [6.129600, 49.601652]
        };
        mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';
        this.map = new mapboxgl.Map(this.mapParam);

    }
    addMarqueur(stationJCD) {
        var marqueur = new Marqueur(stationJCD);
        this.tabMarqueur.push(marqueur);
    }
}