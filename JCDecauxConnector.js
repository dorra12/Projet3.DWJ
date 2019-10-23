class JCDecauxConnector {
    constructor() {
        this.URL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
        this.methode = 'GET';
        this.request = new XMLHttpRequest();
        this.request.responseType = 'json';
    }
    sendRequest() {
        this.request.open(this.methode, this.URL);
        this.request.addEventListener("load", function() {
            if (this.request.status >= 200 && this.request.status < 400) {
                console.log("succès de reponse");
            } else {
                console.error(this.request + " " + this.request.statusText);
            }
        }.bind(this));
        this.request.addEventListener("error", function() {
            console.log("Erreur réseau");
        });
        this.request.send()
    }
}