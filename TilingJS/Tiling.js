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
var TCanvasLib;
(function (TCanvasLib) {
    function getDefaultCtx() {
        var canvas = document.querySelector('canvas');
        return canvas.getContext('2d');
    }
    TCanvasLib.getDefaultCtx = getDefaultCtx;
    function fixAllCanvasesDpi() {
        var canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            var canvas = canvases[i];
            //Copied from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
            var dpi = window.devicePixelRatio;
            //get CSS height
            //the + prefix casts it to an integer
            //the slice method gets rid of "px"
            var style_height = +window.getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
            //get CSS width
            var style_width = +window.getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
            //scale the canvas
            canvas.setAttribute('height', "" + style_height * dpi);
            canvas.setAttribute('width', "" + style_width * dpi);
        }
    }
    TCanvasLib.fixAllCanvasesDpi = fixAllCanvasesDpi;
    function strokePolygon(x, y, nSides, diameter, ctx) {
        var path = polygonPath(x, y, nSides, diameter);
        ctx.stroke(path);
    }
    TCanvasLib.strokePolygon = strokePolygon;
    function fillPolygon(x, y, nSides, diameter, ctx) {
        var path = polygonPath(x, y, nSides, diameter);
        ctx.fill(path);
    }
    TCanvasLib.fillPolygon = fillPolygon;
    function polygonPath(x, y, nSides, diameter) {
        var sideL = diameter * Math.sin(Math.PI / nSides);
        var turtle = new PathTurtle(x, y);
        var innerAngle = Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides;
        //TODO: remove
        var degrees = (innerAngle + 0.0) / (Math.PI * 2) * 360;
        for (var i = 0; i < nSides; i++) {
            turtle.move(sideL);
            turtle.rotate(innerAngle); //- to make it counterclickvise
        }
        return turtle.getPath();
    }
    TCanvasLib.polygonPath = polygonPath;
    var PathTurtle = /** @class */ (function () {
        function PathTurtle(x, y, rotation) {
            if (rotation === void 0) { rotation = 0; }
            this.path = new Path2D();
            this.pos = new TMath.Vector(x, y);
            this.rotation = rotation;
            this.path.moveTo(this.pos.x, this.pos.y);
        }
        PathTurtle.prototype.getPath = function () {
            return this.path;
        };
        PathTurtle.prototype.lineToPos = function () {
            this.path.lineTo(this.pos.x, this.pos.y);
        };
        PathTurtle.prototype.move = function (length) {
            //todo delete
            //let canvas = document.querySelector('canvas');
            //let ctx = canvas.getContext('2d');
            //ctx.moveTo(this.pos.x, this.pos.y);
            var dPos = TMath.Vector.fromRotationAndLength(this.rotation, length);
            this.pos.add(dPos);
            //todo delete
            //ctx.lineTo(this.pos.x, this.pos.y);
            //ctx.stroke();
            this.lineToPos();
        };
        //radians
        PathTurtle.prototype.rotate = function (angle) {
            this.rotation += angle;
        };
        return PathTurtle;
    }());
    TCanvasLib.PathTurtle = PathTurtle;
})(TCanvasLib || (TCanvasLib = {}));
function demo1() {
    var canvas = document.querySelector('canvas');
    var canvasW = window.innerWidth;
    var canvasH = window.innerHeight;
    canvas.width = canvasW;
    canvas.height = canvasH;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    var diameter = 100;
    var nRows = 4;
    var nColumns = 6;
    var xMin = 100;
    var xStep = 150;
    var yMin = 50;
    var yStep = 150;
    var nSides = 3;
    for (var j = 0; j < nRows; j++) {
        var y = yMin + yStep * j;
        for (var i = 0; i < nColumns; i++) {
            var x = xMin + i * xStep;
            TCanvasLib.fillPolygon(x, y, nSides, diameter, ctx);
            nSides++;
        }
    }
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
var TFactories;
(function (TFactories) {
    //MAKE FACTORIES USING BUILDER PATTERN?
    var CircleFactory = /** @class */ (function () {
        function CircleFactory(ctx, r, color) {
            if (r === void 0) { r = 5; }
            if (color === void 0) { color = 'black'; }
            this.ctx = ctx;
            this.r = r;
        }
        CircleFactory.prototype.create = function (pos) {
            var point = new TPosObjects.Circle(this.ctx, pos, this.r, this.color);
            return point;
        };
        return CircleFactory;
    }());
    TFactories.CircleFactory = CircleFactory;
    var DelegatePosObjectFactory = /** @class */ (function () {
        function DelegatePosObjectFactory(ctx, posObjectFactoryDelegate) {
            this.ctx = ctx,
                this.posObjectFactoryDelegate = posObjectFactoryDelegate;
        }
        DelegatePosObjectFactory.prototype.create = function (pos) {
            return this.posObjectFactoryDelegate(this.ctx, pos);
        };
        return DelegatePosObjectFactory;
    }());
    TFactories.DelegatePosObjectFactory = DelegatePosObjectFactory;
    var PosDiameterColorObjectFactory = /** @class */ (function () {
        function PosDiameterColorObjectFactory(ctx) {
            this.posObjectFactoryDelegate = function (ctx, pos, diameter, color) { return new TPosObjects.Circle(ctx, pos, diameter / 2, color); }; //recomended to be overwritten
            this.diameterDelegate = function (pos) { return 5; };
            this.colorDelegate = function (pos) { return 'black'; };
            this.ctx = ctx;
        }
        PosDiameterColorObjectFactory.prototype.create = function (pos) {
            var diameter = this.diameterDelegate(pos);
            var color = this.colorDelegate(pos);
            return this.posObjectFactoryDelegate(this.ctx, pos, diameter, color);
        };
        PosDiameterColorObjectFactory.logisticDiameterFactory = function (ctx, center, diameterMax, x0, growthFactor, color) {
            if (diameterMax === void 0) { diameterMax = 20; }
            if (x0 === void 0) { x0 = 200; }
            if (growthFactor === void 0) { growthFactor = 0.01; }
            if (color === void 0) { color = "blue"; }
            var factory = new TFactories.PosDiameterColorObjectFactory(ctx);
            factory.posObjectFactoryDelegate
                = function (ctx, pos, diameter, color) { return new TPosObjects.Circle(ctx, pos, diameter / 2, color); };
            factory.diameterDelegate = function (pos) { return TMath.logisticFunction(TMath.Vector.subtract(pos, center).norm(), diameterMax, x0, growthFactor); };
            factory.colorDelegate = function (pos) { return color; };
            return factory;
        };
        return PosDiameterColorObjectFactory;
    }());
    TFactories.PosDiameterColorObjectFactory = PosDiameterColorObjectFactory;
})(TFactories || (TFactories = {}));
var TDemos;
(function (TDemos) {
    function circleFactoryDemo() {
        var ctx = TCanvasLib.getDefaultCtx();
        ctx.translate(25, 25);
        var factory = new TFactories.CircleFactory(ctx);
        //naming convention as Solid State physics s. 10
        var a1 = new TMath.Vector(100, 0);
        var a2 = new TMath.Vector(50, 200);
        var mMin = 0, mMax = 8;
        var nMin = 0, nMax = 8;
        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                var pos = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }
    TDemos.circleFactoryDemo = circleFactoryDemo;
    function posObjectFactoryDemo() {
        var ctx = TCanvasLib.getDefaultCtx();
        var canvas = ctx.canvas;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        //naming convention as Solid State physics s. 10
        var diameter = 1;
        var a1 = new TMath.Vector(diameter, 0);
        var a2 = new TMath.Vector(diameter / 2, diameter * 0.8);
        var mMin = -canvasWidth / a1.norm(), mMax = canvasWidth / a1.norm();
        var nMin = -canvasHeight / a2.norm(), nMax = canvasHeight / a2.norm();
        var factory = new TFactories.DelegatePosObjectFactory(ctx, function (ctx, pos) {
            var center = new TMath.Vector(0, 0);
            var dist = TMath.Vector.subtract(pos, center).norm();
            var distRelativeTo = canvasHeight;
            var capedPercentDist = Math.round(Math.min(1, dist / distRelativeTo) * 100);
            //let colorNumber = capedRelativeDist * 255;
            //let color: string = ('00' + (colorNumber).to(16)).slice(2);
            var colorPercent;
            if (Math.round(capedPercentDist / 4) % 2 == 0) {
                colorPercent = '0%';
            }
            else {
                colorPercent = '100%';
            }
            //let colorPercent: string = capedPercentDist.toString() + '%';
            var color = "rgb(" + colorPercent + "," + colorPercent + "," + colorPercent + ")";
            return new TPosObjects.Circle(ctx, pos, diameter / 2, color);
        });
        //let mMin = -20, mMax = 20;
        //let nMin = -20, nMax = 20;
        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                var pos = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }
    TDemos.posObjectFactoryDemo = posObjectFactoryDemo;
    function PosDiameterColorObjectFactoryDemo() {
        var ctx = TCanvasLib.getDefaultCtx();
        var canvas = ctx.canvas;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        //naming convention as Solid State physics s. 10
        var diameterMax = 20;
        var spacing = diameterMax;
        var a1 = new TMath.Vector(spacing, 0);
        var a2 = new TMath.Vector(spacing / 2, Math.sqrt(spacing * spacing - (spacing / 2) * (spacing / 2)));
        var mMin = -canvasWidth / a1.norm(), mMax = canvasWidth / a1.norm();
        var nMin = -canvasHeight / a2.norm(), nMax = canvasHeight / a2.norm();
        var center = new TMath.Vector(0, 0);
        var factory = TFactories.PosDiameterColorObjectFactory.logisticDiameterFactory(ctx, center, 20);
        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                var pos = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }
    TDemos.PosDiameterColorObjectFactoryDemo = PosDiameterColorObjectFactoryDemo;
})(TDemos || (TDemos = {}));
function cropImageDemo() {
    // canvas related variables
    var canvas = document.querySelector('#cropCanvas');
    var ctx = canvas.getContext('2d');
    var cw, ch;
    //var $canvas = $("#canvas");
    //var canvasOffset = $canvas.offset();
    //var offsetX = canvasOffset.left;
    //var offsetY = canvasOffset.top;
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = crop;
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzX5BQxG90wZnmrvCV-eNGsy-WzS6N1euyQ&usqp=CAU";
    function crop() {
        cw = canvas.width = img.width;
        ch = canvas.height = img.height;
        var path = TCanvasLib.polygonPath(60, 3, 6, 200);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.stroke(path);
        ctx.clip(path);
        ctx.drawImage(img, 0, 0);
    }
}
function imageGalleryDemo() {
    alert('not complete, so outcommented');
    //    var canvas: HTMLCanvasElement = document.querySelector('#cropCanvas');
    //    var ctx = canvas.getContext('2d');
    //    let images = document.querySelectorAll('#imageContainer img');
    //    let xMin: number = 100;
    //    let xStep: number = 100;
    //    for (var i = 0; i < images.length; i++) {
    //        let x = xMin + i * xStep;
    //        let y = 100;
    //        let image = images[i];
    //        let path = TCanvasLib.polygonPath(60, 3, 6, 200);
    //        ctx.strokeStyle = 'black';
    //        ctx.lineWidth = 6;
    //        ctx.stroke(path);
    //        ctx.clip(path);
    //        var img = new Image();
    //        img.crossOrigin = 'anonymous';
    //        img.onload = crop;
    //        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzX5BQxG90wZnmrvCV-eNGsy-WzS6N1euyQ&usqp=CAU";
    //        ctx.drawImage(img, 0, 0);
    //    }
}
function LoadAllFiles(path) {
}
var TPosObjects;
(function (TPosObjects) {
    var Circle = /** @class */ (function () {
        function Circle(ctx, pos, radius, color) {
            if (radius === void 0) { radius = 5; }
            if (color === void 0) { color = 'black'; }
            this.pos = pos;
            //for better performance use cavasdata? https://stackoverflow.com/questions/7812514/drawing-a-dot-on-html5-canvas
            //ctx.fillRect(pos.x, pos.y, 1, 1);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
        }
        return Circle;
    }());
    TPosObjects.Circle = Circle;
})(TPosObjects || (TPosObjects = {}));
var TMath;
(function (TMath) {
    function logisticFunction(x, maxValue, x0, growthRate) {
        if (maxValue === void 0) { maxValue = 1; }
        if (x0 === void 0) { x0 = 6; }
        if (growthRate === void 0) { growthRate = 1; }
        var result = maxValue / (1 + Math.exp(-growthRate * (x - x0)));
        return result;
    }
    TMath.logisticFunction = logisticFunction;
})(TMath || (TMath = {}));
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
        Vector.prototype.polarAngle = function () {
            return Math.atan2(this.y, this.x);
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