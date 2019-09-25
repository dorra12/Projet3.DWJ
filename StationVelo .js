class StationVelo {
    constructor(stationJCD) {
        this.name = stationJCD.name;
        this.address = stationJCD.address;
        this.bikeStands = stationJCD.bike_stands;
        this.availableBikeStands = stationJCD.available_bike_stands;
        this.availableBikes = stationJCD.available_bikes;
        this.status = stationJCD.status;
    }
}