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
    });
}

var reserver = new Reservation();
reserver.initStorage();
reserver.clearCanvas();
reserver.init();

var validate = document.getElementById("valider");
validate.addEventListener("click", function(event) {

    //reserver.initTouchEvent();
    document.getElementsByClassName("infos_station")[0].style.display = 'none';
    reserver.window.style.display = 'none';

    // instantier la class de Timer + stocker(sessionStorage)*/
    var counterTimer = new Timer(1200);
    counterTimer.startCounter();

    //stocker (sessionStorage) station Vélos actuelle
    currentStationValid = sessionStorage.getItem('StationStorage');
    sessionStorage.setItem('currentStation', currentStationValid);
    currentStationV = JSON.parse(sessionStorage.getItem('StationStorage'));

    //Stocker nom et prenom dans session storage.
    var currentStorageName = reserver.form.nom.value;
    sessionStorage.setItem("storageName", currentStorageName);
    var currentStorageFirstName = reserver.form.prenom.value;
    sessionStorage.setItem("storageFirstName", currentStorageFirstName);
    counterTimer.reservationText.textContent = "Vélo reservé à la station :" + " " + currentStationV.address + " par : " + currentStorageName + "   " + currentStorageFirstName;
    counterTimer.reservationText.style.display = 'block';
    counterTimer.timerText.style.display = 'block';
    event.preventDefault();
});

// verification reservation en cours
if (sessionStorage.getItem("counterStorage")) {
    var time = sessionStorage.getItem("counterStorage");
    document.getElementsByClassName('initText')[0].style.display = "none";
    var counterTimer = new Timer(time);
    counterTimer.startCounter();
    counterTimer.reservationText.textContent = "Vélo reservé à la station :" + " " + JSON.parse(sessionStorage.getItem("StationStorage")).address + " par " + sessionStorage.getItem("storageName") + "   " + sessionStorage.getItem("storageFirstName");
}
