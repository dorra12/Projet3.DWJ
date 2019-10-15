var carrousel = new Diaporama("mySlides");
carrousel.demarrer();

document.getElementById("precedent").addEventListener("click", function() {
    carrousel.afficherAuClick(event);

});
document.getElementById("suivant").addEventListener("click", function() {
    carrousel.afficherAuClick(event)
});
document.getElementById("bouton_pause").addEventListener("click", function() {
    clearInterval(carrousel.interval);
});
document.getElementById("bouton_play").addEventListener("click", function() {
    clearInterval(carrousel.interval);
    //clic ++ fois sur play => on fat appel a l'evennement stop pour reprendre un nouvel interval.
    carrousel.demarrer();
});

document.addEventListener("keyup", function() {
    carrousel.infosClavier(event);
});

var stationConnector = new JCDecauxConnector();
stationConnector.sendRequest();
var myMap = new MapLuxembourg();

stationConnector.request.onload = function() {


    var stationsJCD = stationConnector.request.response;
    stationsJCD.forEach(function(stationJCD) {
        myMap.addMarqueur(stationJCD);

        var marqueur = myMap.tabMarqueur[myMap.tabMarqueur.length - 1];

        // create a HTML element for each feature

        var el = document.createElement('div');
        el.className = 'marker';

        //ajouter des marqueurs selon le nombre de vélos
        el.style.backgroundImage = marqueur.getMarkerImage();


        // make a marker for each feature and add it to the map
        var tempMrker = new mapboxgl.Marker(el);
        /* myMap.mapParam.zoom = 15;*/

        //tempMrker.setLngLat.setPopup(popUps)
        tempMrker.setLngLat(marqueur.coordinates);
        tempMrker.addTo(myMap.map);
        //tempMrker.setPopup(popUps);
        var markerStorage;
        el.addEventListener('click', (e) => {
            document.getElementsByClassName("adresse")[0].textContent = "Adresse : " + marqueur.station.address;
            document.getElementsByClassName("statusValue")[0].textContent = marqueur.station.status;
            marqueur.colorStatus();
            marqueur.nonResa();
            document.getElementsByClassName("velo_dispo")[0].textContent = "Vélos disponibles : " + marqueur.station.availableBikes;
            document.getElementsByClassName("place_dispo")[0].textContent = "Places disponibles : " + marqueur.station.availableBikeStands;
            document.getElementsByClassName('infos_station')[0].style.display = "block";
            document.getElementsByClassName('initText')[0].style.display = "none";
            markerStorage = JSON.stringify(marqueur.station);
            sessionStorage.setItem("StationStorage", markerStorage);
        });
    });
}

var ddd = new InitReservation();
ddd.initStorage();
ddd.clearCanvas();
ddd.init();

var dddddd = document.getElementById("valider");
dddddd.addEventListener("click", function() {

    document.getElementsByClassName("infos_station")[0].style.display = 'none';
    ddd.window.style.display = 'none';

    // instantier la class de Timer + stocker(sessionStorage)*/
    var counterTimer = new Timer(20);
    counterTimer.startCounter();
    //counterTimer.startCounter();

    //stocker (sessionStorage) station Vélos actuelle
    currentStationValid = sessionStorage.getItem('StationStorage');
    sessionStorage.setItem('currentStation', currentStationValid);
    currentStationV = JSON.parse(sessionStorage.getItem('StationStorage'));

    //Stocker nom et prenom dans session storage.
    var currentStorageName = ddd.currentName.value;
    sessionStorage.setItem("storageName", currentStorageName);
    var currentStorageFirstName = ddd.currentFirstName.value;
    sessionStorage.setItem("storageFirstName", currentStorageFirstName);
    document.getElementById("reservation_text").textContent = "Vélo reservé à la station :" + " " + currentStationV.address + " par " + currentStorageName + " " + currentStorageFirstName;
})

// verification reservation en cours
if (sessionStorage.getItem("storageName")) {

    var time = sessionStorage.getItem("counterStorage");
    document.getElementsByClassName('initText')[0].style.display = "none";
    var counterTimer = new Timer(time);
    counterTimer.startCounter();
    //counterTimer.startCounter();
    document.getElementById("reservation_text").textContent = "Vélo reservé à la station :" + " " + sessionStorage.getItem("StationStorage").address + " par " + sessionStorage.getItem("storageName") + " " + sessionStorage.getItem("storageFirstName");
}