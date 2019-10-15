class JCDecauxConnector {
    constructor() {
        this.URL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
        this.methode = 'GET';
        this.request = new XMLHttpRequest();
        this.request.responseType = 'json';
    }
    sendRequest() {
        this.request.open(this.methode, this.URL);
        this.request.send()
    }
}