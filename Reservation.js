class Reservation {
    constructor() {
        this.boutonForm = document.getElementById("buttonform");
        this.window = document.getElementById("form_reserver");
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.flagClick = false;
        this.canvas.addEventListener("mousedown", this.initCanvas.bind(this));
        this.canvas.addEventListener("mousemove", this.onMoveMouse.bind(this));
        this.canvas.addEventListener("mouseup", this.finTrace.bind(this));
        this.canvas.addEventListener("touchstart", this.touchStart.bind(this))
        this.canvas.addEventListener("touchmove", this.touchmove.bind(this));
        this.canvas.addEventListener("touchend", this.touchend.bind(this));
        this.countStorage;
        this.compteur = 0;
        this.effacer = document.getElementById("effacer");
        this.datas = {};
        this.form = document.querySelector("form");

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
            this.effacer.addEventListener("click", (event) => {
                const width = this.canvas.clientWidth;
                const height = this.canvas.clientHeight;
                this.ctx.beginPath();
                this.ctx.clearRect(0, 0, width, height);
                this.ctx.stroke();
                this.compteur = 0;
                this.countStorage = sessionStorage.setItem("countStorage", this.compteur);
                event.preventDefault();
            })
        }
        /****************/

    getTouchPos(e) {
        var rect = this.canvas.getBoundingClientRect();
        var touch = e.changedTouches["0"];
        var x = touch.clientX - rect.left;
        var y = touch.clientY - rect.top;
        return { x, y }
    }
    touchStart(e) {
        //let touchesPosition = this.getTouchPos(e);
        let p2 = this.getTouchPos(e, this.canvas);
        this.flagClick = true
        this.ctx.lineWidth = 2.5;
        this.ctx.moveTo(p2.x, p2.y);
        this.ctx.beginPath();
        e.preventDefault();
    }
    touchmove(e) {

        //let touchesPosition = this.getTouchPos(e);
        let p3 = this.getTouchPos(e, this.canvas);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.stroke();
        this.compteur++;
        e.preventDefault();
    }
    touchend(e) {
        this.flagClick = false;
        e.preventDefault();
        this.countStorage = sessionStorage.setItem("countStorage", this.compteur);
    }

    initStorage() {
        if (localStorage['formulaire']) {
            // parser la valeur de la clé formulaire.
            var localS = JSON.parse(localStorage['formulaire']);
            //localS est un objet JSON
            this.form.prenom.value = localS[this.form.prenom.id];
            this.form.nom.value = localS[this.form.nom.id];
        }
        this.form.prenom.addEventListener("keypress", (e) => {

            this.datas[e.target.id] = this.form.prenom.value + e.key;
            var stringdatas = JSON.stringify(this.datas)
            localStorage.setItem('formulaire', stringdatas);
        });
        this.form.nom.addEventListener("keypress", (e) => {
            this.datas[e.target.id] = this.form.nom.value + e.key;
            // valeur de la clé de localStorage est une chaine de caractère.
            var stringdatas = JSON.stringify(this.datas);
            localStorage.setItem('formulaire', stringdatas);
        });
    }
}