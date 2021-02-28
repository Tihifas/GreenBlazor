var Alerter = /** @class */ (function () {
    function Alerter() {
    }
    Alerter.prototype.alert = function (message) {
        alert(message);
    };
    return Alerter;
}());
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
function demo1() {
    var canvas = document.querySelector('canvas');
    var canvasW = window.innerWidth;
    var canvasH = window.innerHeight;
    canvas.width = canvasW;
    canvas.height = canvasH;
    var path = new Path2D();
    path.ellipse(150, 150, 100, 150, 0, 0, Math.PI * 2);
    var ctx = canvas.getContext('2d');
    ctx.stroke(path);
    //let image = document.querySelector('img');
    //let sd = new ImageDrawer(ctx, image, 400);
    //sd.draw(50, 50);
    //let images = document.querySelectorAll('img');
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
function LoadAllFiles(path) {
}
//var CanvasHelpers = (function () {
//    return {
//        TracePolygon(nSides: number, sideL: number, ctx: CanvasRenderingContext2D) {
//            //TODO beginpath?
//            //ctx.
//            ctx.
//        }
//    }
//}
//)();
var PathTurtle = /** @class */ (function () {
    function PathTurtle(path, x, y, rotation) {
        if (rotation === void 0) { rotation = 0; }
        this.path = path;
        this.pos = new TMath.Vector(x, y);
        this.rotation = rotation;
    }
    PathTurtle.prototype.pathToPos = function () {
        this.path.moveTo(this.pos.x, this.pos.y);
    };
    PathTurtle.prototype.move = function (length) {
        var dPos = TMath.Vector.fromRotationAndLength(this.rotation);
        this.pos.add(dPos);
        this.pathToPos();
    };
    //radians
    PathTurtle.prototype.rotate = function (angle) {
        this.rotation += angle;
    };
    return PathTurtle;
}());
var TMath;
(function (TMath) {
    var Vector = /** @class */ (function () {
        //static N: Vector = new Vector(0, -1);
        //static NE: Vector = new Vector(Math.sqrt(2), -Math.sqrt(2));
        //static SE: Vector = new Vector(Math.sqrt(2), Math.sqrt(2));
        //static S: Vector = new Vector(0, 2);
        //static SW: Vector = new Vector(-1, 1);
        //static NW: Vector = new Vector(-1, -1);
        function Vector(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector.fromRotationAndLength = function (rotation, lenght) {
            if (lenght === void 0) { lenght = 1; }
            var x = Math.cos(rotation) * lenght;
            var y = Math.sin(rotation) * lenght;
            return new Vector(x, y);
        };
        Vector.prototype.norm = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector.add = function (v1, v2) {
            return new Vector(v1.x + v2.x, v1.y + v2.y);
        };
        Vector.prototype.add = function (vOther) {
            this.x += vOther.x;
            this.y += vOther.y;
        };
        Vector.subtract = function (v1, v2) {
            return new Vector(v1.x - v2.x, v1.y - v2.y);
        };
        Vector.prototype.substract = function (vOther) {
            this.x -= vOther.x;
            this.y -= vOther.y;
        };
        Vector.prototype.scale = function (a) {
            return new Vector(this.x * a, this.y * a);
        };
        Vector.prototype.equals = function (vOther) {
            if (this.x === vOther.x && this.y === vOther.y) {
                return true;
            }
            else {
                return false;
            }
        };
        return Vector;
    }());
    TMath.Vector = Vector;
})(TMath || (TMath = {}));
//# sourceMappingURL=Tiling.js.map