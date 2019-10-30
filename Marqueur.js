class Marqueur {
    constructor(stationJCD) {
        this.coordinates = [stationJCD.position.lng, stationJCD.position.lat];
        this.station = new StationVelo(stationJCD);
        this.nonReservable = document.getElementById("station_non_reservable");
        this.buttonform = document.getElementById("buttonform");
        this.infoStation = document.getElementsByClassName("infos_station")[0];
        this.window = document.getElementById("form_reserver");
         this.details = document.getElementsByClassName("infos_station")[0];
        this.element = this.details.querySelectorAll("p");
        this.adresse = this.element[0];
        this.statusValue = this.element[1];
        this.veloDispo = this.element[2];
        this.placeDispo = this.element[3];
        this.initText = document.getElementsByClassName('initText')[0];
    }
    colorStatus() {

        if (this.station.status === "OPEN") {
            document.getElementsByClassName("statusValue")[0].style.color = "green";
        }
    }
    noReservation(){

        if (this.station.availableBikes == 0) {
            this.window.style.display = "none";
            this.nonReservable.style.display = "block";
            this.buttonform.style.display = "none"
        } else {
            this.nonReservable.style.display = "none";
            this.buttonform.style.display = "block"
        }
    }
    getMarkerImage() {
        var imgMarker;

        if (this.station.availableBikes == 0) {
            imgMarker = "url('Images/MarkerRouge.png')";
        } else if (this.station.availableBikes < 4) {
            imgMarker = "url('Images/MarkerOrange.png')";
        } else {
            imgMarker = "url('Images/MarkerVert.png')";
        }
        return imgMarker;
    }
    stylechange() {
        this.infoStation.style.height = '100%';
    }
     infosMarqueur() {
        this.adresse.textContent = "Adresse : " + this.station.address;
        this.statusValue.textContent = this.station.status;
        this.veloDispo.textContent = "Vélos disponibles : " + this.station.availableBikes;
        this.placeDispo.textContent = "Places disponibles : " + this.station.availableBikeStands;
        this.infoStation.style.display = "block";
        this.initText.style.display = "none";
    }

}
