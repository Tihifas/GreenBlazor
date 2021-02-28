var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
    //var alerter = new Alerter();
    //alerter.alert('ALERT');
};
var Alerter = /** @class */ (function () {
    function Alerter() {
    }
    Alerter.prototype.alert = function (message) {
        alert(message);
    };
    return Alerter;
}());
//Draw in constructor instead?
var SimpleDrawable = /** @class */ (function () {
    function SimpleDrawable(ctx) {
        this.ctx = ctx;
    }
    SimpleDrawable.prototype.draw = function (x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.stroke();
    };
    return SimpleDrawable;
}());
var ImageDrawer = /** @class */ (function () {
    function ImageDrawer(ctx, image, width) {
        this.ctx = ctx;
        this.image = image;
        this.width = width;
    }
    ImageDrawer.prototype.draw = function (x, y) {
        var height = this.width * (this.image.height + 0.0) / this.image.width;
        this.ctx.drawImage(this.image, x, y, this.width, height);
        //this.image.addEventListener('load', e => {
        //    alert('draw' + this.image);
        //    this.ctx.drawImage(this.image, x, y, 50, 50);
        //});
    };
    return ImageDrawer;
}());
var ClipDrawer = /** @class */ (function () {
    function ClipDrawer(ctx, image, width) {
        this.ctx = ctx;
        this.image = image;
        this.width = width;
    }
    ClipDrawer.prototype.draw = function (x, y) {
        var height = this.width * (this.image.height + 0.0) / this.image.width;
        this.ctx.drawImage(this.image, x, y, this.width, height);
    };
    return ClipDrawer;
}());
function demo1() {
    var canvas = document.querySelector('canvas');
    var canvasW = window.innerWidth;
    var canvasH = window.innerHeight;
    canvas.width = canvasW;
    canvas.height = canvasH;
    var ctx = canvas.getContext('2d');
    var image = document.querySelector('img');
    var sd = new ImageDrawer(ctx, image, 400);
    sd.draw(50, 50);
    var images = document.querySelectorAll('img');
    //let xMin: number = 100;
    //let xStep: number = 100;
    //for (var i = 0; i < images.length; i++) {
    //    let x = xMin + i * xStep;
    //    let y = 100;
    //    let image = images[i];
    //    let sd = new ImageDrawer(ctx, image);
    //    sd.draw(x, y);
    //}
    //let sd = new SimpleDrawable(
    //ctx);
    //for (var x = xMin; x <= xMax; x += xStep) {
    //    sd.draw(x, 50);
    //}
}
function LoadAllFiles(path) {
}
//# sourceMappingURL=Tiling.js.map