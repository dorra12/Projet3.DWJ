class Marqueur {
    constructor(stationJCD) {
        this.coordinates = [stationJCD.position.lng, stationJCD.position.lat];
        this.station = new StationVelo(stationJCD);
        this.nonReservable = document.getElementById("station_non_reservable");
        this.buttonform = document.getElementById("buttonform");
        this.marqueurCible = document.getElementsByClassName("marker");
        this.infoStation = document.getElementsByClassName("infos_station")[0];
        this.window = document.getElementById("form_reserver");
    }
    colorStatus() {

        if (this.station.status === "OPEN") {
            document.getElementsByClassName("statusValue")[0].style.color = "green";
        }
    }
    nonResa() {

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

}
