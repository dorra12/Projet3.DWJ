class Timer {
    constructor(counter) {
        this.reservationText = document.getElementById("reservation_text");
        this.timerText = document.getElementById("timertext");
        this.interval = "";
        this.counter = counter;
        this.afficheur;
    }
    countDown() {
        this.counter = sessionStorage.getItem("counterStorage");
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
            this.timerText.style.fontSize = '25px';
        } else {
            clearInterval(this.interval);
            sessionStorage.removeItem("counterStorage");
            setTimeout(() => {
                this.reservationText.style.display = 'none';
                this.timerText.textContent = "Veuiller reprendre une nouvelle reservation";
            }, 2000);
            this.timerText.textContent = "temps écoulé";
        }
    }
    startCounter() {
        sessionStorage.setItem("counterStorage", this.counter);
        this.interval = setInterval(this.countDown.bind(this), 1000);

    }
}
