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
        var el = document.createElement('div');
        el.className = 'marker';
        //ajouter des marqueurs selon le nombre de vélos
        el.style.backgroundImage = marqueur.getMarkerImage();
        // make a marker for each feature and add it to the map
        var tempMrker = new mapboxgl.Marker(el);
        //tempMrker.setLngLat.setPopup(popUps)
        tempMrker.setLngLat(marqueur.coordinates);
        tempMrker.addTo(this.map);
        //tempMrker.setPopup(popUps);
        var markerStorage;
       el.addEventListener('click', (e) => {
            if (sessionStorage.getItem("counterStorage")) {
                var reponse = confirm("Attention ! Une réservation est en cours. Voulez vous continuez et annuler votre réservation ?")
                if (reponse === true) {
                    sessionStorage.clear();
                    document.getElementById('reservation_text').style.display = "none";
                    document.getElementById('timertext').style.display = "none";
                }
            } else {
                marqueur.infosMarqueur()
                marqueur.colorStatus();
                marqueur.noReservation();
                markerStorage = JSON.stringify(marqueur.station);
                sessionStorage.setItem("StationStorage", markerStorage);
            }
        });
    }
}
