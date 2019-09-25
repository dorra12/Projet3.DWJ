class JCDecauxConnector {
    constructor(URL) {
        this.URL = URL;
        this.methode = 'GET';
        this.request = new XMLHttpRequest();
        this.request.responseType = 'json';
    }
    sendRequest() {
        this.request.open(this.methode, this.URL);
        this.request.send()
    }
}