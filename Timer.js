class Timer {
    constructor(counter) {
        this.timerText = document.getElementById("timertext");
        this.interval = "";
        this.counter = counter;
        this.afficheur;
    }
    countDown() {

        if (this.counter > 0) {
            this.counter -= 1;
            this.afficheur = sessionStorage.setItem("counterStorage", this.counter);
            var minutesRest = Math.round((this.counter - 30) / 60);
            var second = this.counter % 60;
            if (second < 10) {
                second = "0" + second;
            }
            var tempsCounter = minutesRest + " min " + second + " s";
            this.timerText.textContent = "Temps restant avant l'expiration de la réservation " + tempsCounter;
        } else {
            clearInterval(this.interval);
            sessionStorage.clear();
            this.timerText.textContent = "temps écoulé"
        }
    }
    startCounter() {

        this.interval = setInterval(this.countDown.bind(this), 1000);

    }
}