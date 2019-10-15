class Diaporama {
    constructor(cible) {
        this.images = document.getElementsByClassName(cible);
        this.position = 0;
        this.interval = '';
        this.afficherImage();
    }

    afficherImage() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].style.display = "none";
        }
        this.images[this.position].style.display = "block";
    }

    afficherSuivant() {
        if (this.position < this.images.length - 1) {
            this.position++;
        } else {
            this.position = 0;
        }
        this.afficherImage();
    }
    afficherPrecedent() {
        if (this.position > 0) {
            this.position--;
        } else {
            this.position = this.images.length - 1;
        }
        this.afficherImage();
    }

    afficherAuClick(event) {

        if (event.target.getAttribute('id') === "precedent") {
            this.afficherPrecedent();
        }
        if (event.target.getAttribute('id') === "suivant") {
            this.afficherSuivant();
        }
        clearInterval(this.interval);
        //vide l'ancien interval.
        this.demarrer();
        //generer un nouvel interval.
    }
    demarrer() {
        this.interval = setInterval(this.afficherSuivant.bind(this), 5000);
    }
    infosClavier(event) {

        if (event.keyCode === 39) {
            this.afficherSuivant();
        } else if (event.keyCode === 37) {
            this.afficherPrecedent();
        }
    }
}