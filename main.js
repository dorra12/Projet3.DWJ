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

/*document.addEventListener("keyup", function(event){console.log(event.keyCode);
});	*/
document.addEventListener("keyup", function() {
    carrousel.infosClavier(event);
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ycmFhIiwiYSI6ImNqeXN3OGFidjAwZWozY3A5MmtjNWlkcm0ifQ.VXkf7Qy-fB0mUZXUoldzZg';

var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
var stationConnector = new JCDecauxConnector(requestURL);
stationConnector.sendRequest();
var myMap = new MapLuxembourg();

//myMap.createClustor();


//    /* Appel API JC Decaux*/
//var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?apiKey=aa3a65607bf4370c3f1bc3071632214156880476&contract=luxembourg';
//  /* requete*/
//var request = new XMLHttpRequest();
//  /*type de requete GET */
//request.open('GET', requestURL);
// /*type de reponse= JSON*/
//request.responseType = 'json';
//  /*envoie  requete*/
//request.send();
//  /*onload :*/

stationConnector.request.onload = function() {


    var stationsJCD = stationConnector.request.response;
    stationsJCD.forEach(function(stationJCD) {
            myMap.addMarqueur(stationJCD);
        })
        // add markers to map
    myMap.tabMarqueur.forEach(function(marqueur) {

        // create a HTML element for each feature

        var el = document.createElement('div');
        el.className = 'marker';

        //ajouter des marqueurs selon le nombre de vélos
        el.style.backgroundImage = marqueur.getMarkerImage();




        // make a marker for each feature and add it to the map
        var tempMrker = new mapboxgl.Marker(el);

        //var offset = 25;
        //var popUps = new mapboxgl.Popup(offset)


        //tempMrker.setLngLat.setPopup(popUps)
        tempMrker.setLngLat(marqueur.coordinates);
        tempMrker.addTo(myMap.map);
        //tempMrker.setPopup(popUps);

        el.addEventListener('click', () => {

            document.getElementsByClassName("adresse")[0].textContent = "Adresse : " + marqueur.station.address;
            document.getElementsByClassName("statusValue")[0].textContent = marqueur.station.status;
            marqueur.colorStatus();
            marqueur.nonResa();
            document.getElementsByClassName("velo_dispo")[0].textContent = "Vélos disponibles : " + marqueur.station.availableBikes;
            document.getElementsByClassName("place_dispo")[0].textContent = "Places disponibles : " + marqueur.station.availableBikeStands;
        });

        //new mapboxgl.Marker(el).setLngLat(marqueur.coordinates).addTo(myMap.map);  
        //new mapboxgl.Marker(el).setLngLat(marqueur.coordinates).setPopup(new mapboxgl.Popup({offset: 25}) // add popups
        //.setHTML('<h3>' + marqueur.station.name + '</h3><p>' + marqueur.station.address + '</br>' + marqueur.station.status + '</p>'))
        //.addTo(myMap.map);
    });
};

class InitReservation {
    constructor() {
        this.boutonForm = document.getElementById("buttonform");
        this.window = document.getElementById("form_reserver");
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.flagClick = false;
        this.canvas.addEventListener("mousedown", this.initCanvas.bind(this));
        this.canvas.addEventListener("mousemove", this.onMoveMouse.bind(this));
        this.canvas.addEventListener("mouseup", this.finTrace.bind(this));
        this.effacer = document.getElementById("affacer");
        this.datas = {};
        this.currentFirstName = document.getElementById("filed1");
        this.currentName = document.getElementById("filed2");
        this.buttonReserv = document.getElementById("reserver");
        this.missPrenom = document.getElementById("missPrenom");
        this.currentReservation = document.getElementById("reservation_text");

    }
    init() {
        this.boutonForm.addEventListener("click", (e) => {

            this.window.style.display = 'block';
        })
    }
    getXY(evt, canvasParam) {
        var rect = canvasParam.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        return { x, y }
    }
    initCanvas(e1) {
        let p0 = this.getXY(e1, this.canvas);
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);
        this.flagClick = true;
    }
    print(e2) {
        let p1 = this.getXY(e2, this.canvas);
        this.ctx.lineTo(p1.x, p1.y);
        this.ctx.stroke();
    }
    onMoveMouse(eParam) {
        if (this.flagClick == true) {
            this.print(eParam);
        }
    }
    finTrace(evtUp) {
        this.flagClick = false;
    }
    clearCanvas() {
        this.effacer.addEventListener("click", () => {

            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;
            this.ctx.beginPath();
            this.ctx.clearRect(0, 0, width, height);
            this.ctx.stroke();
        })
    }
    initStorage() {

        if (localStorage['formulaire']) {
            var localS = JSON.parse(localStorage['formulaire']);
            this.currentFirstName.value = localS[this.currentFirstName.id];
            this.currentName.value = localS[this.currentName.id];
        }

        this.currentFirstName.addEventListener("keypress", (e) => {
            /* var charCode = e.charCode;
            if (charCode > 65 && charCode < 122) {
                e.preventDefault()
			}*/
            this.datas[e.target.id] = this.currentFirstName.value + e.key;
            var stringdatas = JSON.stringify(this.datas)
            localStorage.setItem('formulaire', stringdatas);
        } /*, false*/ );

        this.currentName.addEventListener("keypress", (e) => {

            /* var charCode = e.charCode;
            if ((charCode > 97 && charCode < 122) || (charCode > 65 && charCode < 90)) {
                e.preventDefault()
			}*/
            this.datas[e.target.id] = this.currentName.value + e.key;
            var stringdatas = JSON.stringify(this.datas)
            localStorage.setItem('formulaire', stringdatas);

        } /*false*/ );
    }
    reserver() {

        this.buttonReserv.addEventListener("click", (e) => {
            if ((this.currentFirstName.validity.valueMissing) ||
                (this.currentName.validity.valueMissing)) {
                e.preventDefault();
                this.missPrenom.textContent = "Champs obligatoire"
                this.missPrenom.style.color = "red";
                this.missPrenom.style.fontSize = "10px";
            } else {
                this.currentReservation.textContent = "Vélo reservé à la station" + "par";
            }

        })
    }
}



var ddd = new InitReservation();
ddd.initStorage();

ddd.clearCanvas();
ddd.init();
ddd.reserver();




class Timer {
    constructor(nom, prenom, station) {
        this.timerText = document.getElementById("timertext");
        this.nom = nom;
        this.prenom = prenom;
        this.stationVelo = station;
        this.interval = "";
    }
    initCounter() {
        this.counter = 20;
    }
    counters() {
        if (this.counter > 0) {
            this.counter -= 1;
            var minutesRest = Math.round((this.counter - 30) / 60);
            var second = this.counter % 60;
            if (second < 10) {
                second = "0" + second;
            }
            this.timerText.textContent = "Temps Restant : " + minutesRest + " min " + second + " s";
        } else {
            this.timerText.textContent = "temps écoulé"
        }
    }
    startCounter() {
        this.initCounter();
        this.interval = setInterval(this.counters.bind(this), 1000);

    }
    decrire() {
        var reservation = ("Vélo réservé à la station " + this.stationVelo + "par " + this.prenom + " " + this.nom);
    }
}




var www = new Timer();

document.getElementById("timerButton").addEventListener("click", function() {
    www.startCounter();
});
document.getElementById("bouton_annuler").addEventListener("click", function() {
    clearInterval(www.interval);
});
