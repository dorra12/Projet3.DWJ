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
            // parser la valeur de la clé formulaire.
            var localS = JSON.parse(localStorage['formulaire']);
            //localS est un objet JSON
            this.currentFirstName.value = localS[this.currentFirstName.id];
            this.currentName.value = localS[this.currentName.id];
        }

        this.currentFirstName.addEventListener("keypress", (e) => {

            this.datas[e.target.id] = this.currentFirstName.value + e.key;
            var stringdatas = JSON.stringify(this.datas)
            localStorage.setItem('formulaire', stringdatas);
        });

        this.currentName.addEventListener("keypress", (e) => {
            this.datas[e.target.id] = this.currentName.value + e.key;
            // valeur de la clé de localStorage est une chaine de caractère.
            var stringdatas = JSON.stringify(this.datas);
            localStorage.setItem('formulaire', stringdatas);

        });
    }
}