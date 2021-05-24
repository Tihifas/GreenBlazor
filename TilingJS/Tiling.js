var TMath;
(function (TMath) {
    var Angle = /** @class */ (function () {
        function Angle(radiansFromXPos) {
            this.angle = radiansFromXPos;
        }
        Object.defineProperty(Angle.prototype, "radiansFromXPos", {
            //For example FromX is from x-axis.
            //Pos: positiv omløbsretning / anticlockvise, Neg: negativ omløbsretning / clockwise
            get: function () { return this.angle; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "degreesFromXPos", {
            get: function () { return Angle.radiansToDegrees(this.angle); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "radiansFromXNeg", {
            get: function () { return -this.angle; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "degreesFromXNeg", {
            get: function () { return -Angle.radiansToDegrees(this.angle); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "radiansFromYNeg", {
            get: function () { return -this.angle + Math.PI / 2; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "degreesFromYNeg", {
            get: function () { return Angle.radiansToDegrees(this.radiansFromYNeg); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Angle.prototype, "inPIs", {
            get: function () { return this.angle / Math.PI; },
            enumerable: false,
            configurable: true
        });
        Angle.prototype.copy = function () {
            return new Angle(this.angle);
        };
        Angle.prototype.cos = function () {
            return Math.cos(this.angle);
        };
        Angle.prototype.sin = function () {
            return Math.sin(this.angle);
        };
        Angle.prototype.scale = function (a) {
            this.angle = this.angle * a;
            return this;
        };
        Angle.prototype.add = function (otherAngle) {
            this.angle += otherAngle.angle;
            return this;
        };
        Angle.add = function (angle1, angle2) {
            return new Angle(angle1.angle + angle2.angle);
        };
        Angle.fromRadiansFromXPos = function (radiansFromXPos) {
            return new Angle(radiansFromXPos);
        };
        Angle.fromRadiansFromXNeg = function (radiansFromXNeg) {
            return new Angle(-radiansFromXNeg);
        };
        Angle.fromRadiansFromYNeg = function (radiansFromYNeg) {
            var radiansFromXPos = -radiansFromYNeg + Math.PI / 2;
            return new Angle(radiansFromXPos);
        };
        Angle.fromDegreesFromXPos = function (degreesFromXPos) {
            return new Angle(Angle.degreesToRadians(degreesFromXPos));
        };
        Angle.fromDegreesFromXNeg = function (degreesFromXNeg) {
            return new Angle(-Angle.degreesToRadians(degreesFromXNeg));
        };
        Angle.fromDegreesFromYNeg = function (degreesFromYNeg) {
            var radiansFromXPos = -Angle.radiansToDegrees(degreesFromYNeg) + Math.PI / 2;
            return new Angle(radiansFromXPos);
        };
        Angle.radiansToDegrees = function (radians) {
            return radians / (2 * Math.PI) * 360;
            ;
        };
        Angle.degreesToRadians = function (degrees) {
            return degrees / (360) * 2 * Math.PI;
        };
        return Angle;
    }());
    TMath.Angle = Angle;
})(TMath || (TMath = {}));
var TCanvasClasses;
(function (TCanvasClasses) {
    var Rotation = /** @class */ (function () {
        function Rotation(angle, rotationPoint) {
            this.angle = angle;
            this.rotationPoint = rotationPoint;
        }
        //Just rotates ctx around roration point, does not draw anything
        Rotation.prototype.applyToCtx = function (ctx) {
            ctx.translate(this.rotationPoint.x, this.rotationPoint.y);
            ctx.rotate(this.angle.radiansFromXNeg);
            ctx.translate(-this.rotationPoint.x, -this.rotationPoint.y);
        };
        return Rotation;
    }());
    TCanvasClasses.Rotation = Rotation;
    //Abandoned because confusing to make line without plotting it
    //export class Line {
    //    point: TMath.Vector;
    //    parallelVector: TMath.Vector;
    //    angle: TMath.Angle;
    //    constructor(point: TMath.Vector, angle: TMath.Angle) {
    //        this.point = point;
    //        this.angle = angle;
    //        this.parallelVector = new TMath.Vector(Math.cos(angle.degreesFromXPos), Math.sin(angle.degreesFromXPos));
    //    }
    //}
})(TCanvasClasses || (TCanvasClasses = {}));
var TDemos;
(function (TDemos) {
    function CopyHexagonDemo() {
        var nCanvases = 10;
        var canvasHeight = 400;
        var canvasWidth = 800;
        var left = 50;
        var top = 100;
        var canvases = TCanvasTagCreation.MakeCanvasColumn(nCanvases, canvasHeight, canvasWidth, left, top);
        for (var i = 0; i < nCanvases; i++) {
            //let canvas = TCanvasTagCreation.MakeCanvas(left, top, canvasWidth, canvasHeight);
            var canvas = canvases[i];
            var ctx = canvas.getContext("2d");
            var origin_1 = new TMath.Vector(0, 0);
            ctx.fillRect(canvasWidth / 2, 0, 2, canvasHeight);
            canvas.style.border = "1px solid black";
            var arrowCenter = new TMath.Vector(canvasWidth / 4, canvasHeight / 2);
            drawArrow(arrowCenter, canvasWidth, canvasHeight, ctx);
            var rotationPoint0 = new TMath.Vector(canvasWidth / 4, canvasHeight / 2);
            new TPosObjects.Circle(ctx, rotationPoint0, 10, 'red');
            var recSideL = canvasWidth / 2;
            //let translationVector = new TMath.Vector(0, 0);
            var translationVector = new TMath.Vector(canvasWidth / 2, 0);
            //let toPoint =  new TMath.Vector(recSideL, 0);
            var toPoint = translationVector;
            var rotationPointReal = TMath.Vector.add(rotationPoint0, translationVector);
            var angle = -Math.PI / 8 * i;
            var rotation = new TCanvasClasses.Rotation(TMath.Angle.fromRadiansFromXPos(angle), rotationPointReal);
            var sourceRect = new TPosObjects.Rectangle(origin_1, canvasWidth / 2 - 2, canvasHeight - 2);
            TDuplication.copyRotatePasteRect(ctx, sourceRect, toPoint.x, toPoint.y, rotation);
        }
    }
    TDemos.CopyHexagonDemo = CopyHexagonDemo;
    function drawArrow(arrowCenter, canvasWidth, canvasHeight, ctx) {
        var arrowWidth = 20;
        var arrowLength = canvasHeight / 4;
        var arrowPointSideL = 10;
        var arrowTip = new TMath.Vector(arrowCenter.x, arrowCenter.y - arrowLength / 2 - arrowPointSideL);
        ctx.fillRect(arrowCenter.x - arrowWidth / 4, arrowCenter.y - arrowLength / 2, arrowPointSideL, arrowLength);
        TCanvasLib.fillPolygonBySideL(arrowTip, 4, 20, ctx);
        return arrowTip;
    }
})(TDemos || (TDemos = {}));
var TCanvasLib;
(function (TCanvasLib) {
    function getDefaultCtx() {
        var canvas = document.querySelector('canvas');
        return canvas.getContext('2d');
    }
    TCanvasLib.getDefaultCtx = getDefaultCtx;
    function fixCanvasDpi(canvas) {
        //Copied from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
        var dpi = window.devicePixelRatio;
        dpi = dpi * 2 / 3; //On desktop it was * 1, og laptop it was * 2/3
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
    TCanvasLib.fixCanvasDpi = fixCanvasDpi;
    //TODO: call when resizing window
    function fixAllCanvasesDpi1() {
        var canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            var canvas = canvases[i];
            fixCanvasDpi(canvas);
        }
    }
    TCanvasLib.fixAllCanvasesDpi1 = fixAllCanvasesDpi1;
    function fixAllCanvasesDpi2() {
        var canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            var canvas = canvases[i];
            //Inspired by https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
            // Set actual size in memory (scaled to account for extra pixel density).
            var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
            canvas.width = Math.floor(canvas.width * scale);
            canvas.height = Math.floor(canvas.height * scale);
            // Normalize coordinate system to use css pixels.
            var ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
        }
    }
    TCanvasLib.fixAllCanvasesDpi2 = fixAllCanvasesDpi2;
    function strokePolygonBySideL(pos0, nSides, sideL, ctx) {
        var cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        strokePolygon(pos0, nSides, cDiameter, ctx);
    }
    TCanvasLib.strokePolygonBySideL = strokePolygonBySideL;
    //cDiameter: Circumscribed diabeter https://en.wikipedia.org/wiki/Regular_polygon#Circumradius
    function strokePolygon(pos0, nSides, cDiameter, ctx) {
        var path = polygonPath(pos0, nSides, cDiameter);
        ctx.stroke(path);
    }
    TCanvasLib.strokePolygon = strokePolygon;
    function fillPolygonBySideL(pos0, nSides, sideL, ctx) {
        var cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        fillPolygon(pos0, nSides, cDiameter, ctx);
    }
    TCanvasLib.fillPolygonBySideL = fillPolygonBySideL;
    function fillPolygon(pos0, nSides, cDiameter, ctx) {
        var path = polygonPath(pos0, nSides, cDiameter);
        ctx.fill(path);
    }
    TCanvasLib.fillPolygon = fillPolygon;
    function polygonPathBySideL(pos0, nSides, sideL, angle0Override) {
        if (angle0Override === void 0) { angle0Override = null; }
        var cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        return polygonPath(pos0, nSides, cDiameter, angle0Override);
    }
    TCanvasLib.polygonPathBySideL = polygonPathBySideL;
    function polygonPath(pos0, nSides, cDiameter, angle0Override) {
        if (angle0Override === void 0) { angle0Override = null; }
        var sideL = cDiameter * Math.sin(Math.PI / nSides);
        var turtle = new PathTurtle(pos0);
        var innerAngle = TMath.Angle.fromRadiansFromXPos(Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides);
        if (angle0Override === null) {
            turtle.rotate(innerAngle.copy().scale(0.5)); //default Rotated because hexagonal packing is easier
        }
        else {
            turtle.rotate(angle0Override);
        }
        for (var i = 0; i < nSides; i++) {
            turtle.move(sideL);
            turtle.rotate(innerAngle); //- to make it counterclickvise
        }
        return turtle.getPath();
    }
    TCanvasLib.polygonPath = polygonPath;
    function drawImage(ctx, img, pos, rotation) {
        if (rotation === void 0) { rotation = null; }
        if (rotation == null) {
            ctx.drawImage(img, pos.x, pos.y);
        }
        else {
            ctx.save();
            rotation.applyToCtx(ctx);
            ctx.drawImage(img, pos.x, pos.y);
            ctx.restore();
        }
    }
    TCanvasLib.drawImage = drawImage;
    function drawImgOnCanvasAsIs(ctx, img) {
        ctx.save();
        var dx = img.offsetLeft - ctx.canvas.offsetLeft;
        var dy = img.offsetTop - ctx.canvas.offsetTop;
        ctx.drawImage(img, dx, dy, img.width, img.height);
        ctx.restore();
    }
    TCanvasLib.drawImgOnCanvasAsIs = drawImgOnCanvasAsIs;
    function drawImgOnCanvasInRegionAsIs(ctx, img, outlinePath) {
        ctx.save();
        ctx.clip(outlinePath);
        drawImgOnCanvasAsIs(ctx, img);
        ctx.restore();
    }
    TCanvasLib.drawImgOnCanvasInRegionAsIs = drawImgOnCanvasInRegionAsIs;
    function cakeSlicePath(center, radius, angle1, angle2) {
        var path = new Path2D();
        path.moveTo(center.x, center.y);
        var toAngle1 = TMath.Vector.fromPolar(radius, angle1).yNegCopy();
        var atAngle1 = TMath.Vector.add(center, toAngle1);
        path.lineTo(atAngle1.x, atAngle1.y);
        path.arc(center.x, center.y, radius, angle1.radiansFromXNeg, angle2.radiansFromXNeg, true);
        var toAngle2 = TMath.Vector.fromPolar(radius, angle2).yNegCopy();
        var atAngle2 = TMath.Vector.add(center, toAngle2);
        path.moveTo(atAngle2.x, atAngle2.y); //Obs move to, not line to.
        path.lineTo(center.x, center.y);
        return path;
    }
    TCanvasLib.cakeSlicePath = cakeSlicePath;
    var PathTurtle = /** @class */ (function () {
        function PathTurtle(pos0, rotation) {
            if (rotation === void 0) { rotation = 0; }
            this.path = new Path2D();
            this.pos = pos0;
            this.rotation = new TMath.Angle(rotation);
            this.path.moveTo(this.pos.x, this.pos.y);
        }
        PathTurtle.prototype.getPath = function () {
            return this.path;
        };
        PathTurtle.prototype.lineToPos = function () {
            this.path.lineTo(this.pos.x, this.pos.y);
        };
        PathTurtle.prototype.move = function (length) {
            var dPos = TMath.Vector.fromPolar(length, this.rotation);
            this.pos.add(dPos);
            this.lineToPos();
        };
        //radians
        PathTurtle.prototype.rotate = function (angle) {
            this.rotation.add(angle);
        };
        return PathTurtle;
    }());
    TCanvasLib.PathTurtle = PathTurtle;
    function drawLineByVector(ctx, point, vector, strokeStyle) {
        if (strokeStyle === void 0) { strokeStyle = null; }
        if (strokeStyle != null)
            ctx.strokeStyle = strokeStyle;
        var destination = TMath.Vector.add(point, vector);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(destination.x, destination.y);
        ctx.stroke();
    }
    TCanvasLib.drawLineByVector = drawLineByVector;
    function drawLineByAngle(point, angle, ctx, bothDirections, strokeStyle) {
        if (bothDirections === void 0) { bothDirections = true; }
        if (strokeStyle === void 0) { strokeStyle = null; }
        var canvas = ctx.canvas;
        var canvasW = canvas.width;
        var canvasH = canvas.height;
        var lineLength = Math.sqrt(canvasW * canvasW + canvasH * canvasH);
        var lineVector = TMath.Vector.fromPolar(lineLength, angle);
        TCanvasLib.drawLineByVector(ctx, point, lineVector, strokeStyle);
        if (bothDirections) {
            lineVector.scale(-1);
            TCanvasLib.drawLineByVector(ctx, point, lineVector, strokeStyle);
        }
    }
    TCanvasLib.drawLineByAngle = drawLineByAngle;
})(TCanvasLib || (TCanvasLib = {}));
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
var TDuplication;
(function (TDuplication) {
    function copyRotatePasteRect(ctx, sourceRect, dx, dy, rotation) {
        rotation.applyToCtx(ctx);
        ctx.drawImage(ctx.canvas, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height, dx, dy, sourceRect.width, sourceRect.height);
        ctx.resetTransform();
    }
    TDuplication.copyRotatePasteRect = copyRotatePasteRect;
    function copyRotatePasteRegion(ctx, srcRegionOutline, rotation) {
        ctx.save();
        rotation.applyToCtx(ctx);
        ctx.clip(srcRegionOutline);
        ctx.drawImage(ctx.canvas, 0, 0);
        ctx.resetTransform();
        ctx.restore();
    }
    TDuplication.copyRotatePasteRegion = copyRotatePasteRegion;
    //function crop() {
    //    cw = canvas.width = img.width;
    //    ch = canvas.height = img.height;
    //    let path = TCanvasLib.polygonPath(new TMath.Vector(60, 3), 6, 200);
    //    ctx.strokeStyle = 'black';
    //    ctx.lineWidth = 6;
    //    ctx.stroke(path);
    //    ctx.clip(path);
    //    ctx.drawImage(img, 0, 0);
    //}
})(TDuplication || (TDuplication = {}));
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
        //TODO: make using gradient
        PosDiameterColorObjectFactory.logisticColorHexagonFactory = function (ctx, center, diameter, x0, growthFactor, color) {
            if (diameter === void 0) { diameter = 20; }
            if (x0 === void 0) { x0 = 20; }
            if (growthFactor === void 0) { growthFactor = 0.02; }
            if (color === void 0) { color = "blue"; }
            var factory = new TFactories.PosDiameterColorObjectFactory(ctx);
            factory.posObjectFactoryDelegate
                = function (ctx, pos, diameter, color) { return new TPosObjects.Polygon(ctx, 6, pos, diameter, color); };
            factory.colorDelegate = function (pos) {
                //let colorPercent = TMath.logisticFunction(TMath.Vector.subtract(pos, center).norm(), 100, x0, growthFactor);
                //let color: string = "rgb(" + 0 + "%," + 0 + "%," + colorPercent + "%)";
                var dist = TMath.Vector.subtract(pos, center).norm();
                var alpha = 1 - TMath.logisticFunction(dist, 1, x0, growthFactor);
                var color = "rgba(0,0,255," + alpha + ")";
                return color;
            };
            factory.diameterDelegate = function (pos) { return diameter; };
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
        var path = TCanvasLib.polygonPath(new TMath.Vector(60, 3), 6, 200);
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
var TPlotterDemos;
(function (TPlotterDemos) {
    function mouseDemo() {
        var mouse = new TMath.Vector(undefined, undefined);
        var ctx = TCanvasLib.getDefaultCtx();
        //TODO canvas gradient https://www.youtube.com/watch?v=Ug8u_raENl8
        //naming as https://en.wikipedia.org/wiki/Hexagon
        var d = 20; //inner circle diameter = x spacing
        var a2y = Math.sqrt(d * d - (d / 2) * (d / 2));
        //Hexagonal close packing (also works with circles)
        var a1 = new TMath.Vector(d, 0);
        var a2 = new TMath.Vector(d / 2, a2y);
        var D = 2 / Math.sqrt(3) * d; //circumscribed circle diameter = hexagon "diameter"
        function draw(mouse) {
            //let factory = new TFactories.CircleFactory(ctx);
            //factory.create(mouse);
            var factory = TFactories.PosDiameterColorObjectFactory.logisticColorHexagonFactory(ctx, mouse, D);
            TPlotters.fillCtx(ctx, factory, a1, a2);
        }
        //draw(new TMath.Vector(0,0));
        window.addEventListener('mousemove', function (event) {
            var canvas = ctx.canvas;
            mouse.x = event.x;
            mouse.y = event.y;
            mouse.x = mouse.x - canvas.offsetLeft;
            mouse.y = mouse.y - canvas.offsetTop;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(mouse);
            console.log(mouse);
        });
    }
    TPlotterDemos.mouseDemo = mouseDemo;
})(TPlotterDemos || (TPlotterDemos = {}));
var TPlotters;
(function (TPlotters) {
    //TODO: defautl a1, a2
    function rectangle(ctx, x, y, width, height, factory, a1, a2) {
        var origin = new TMath.Vector(x, y);
        var canvas = ctx.canvas;
        var mMaxIfa2IsVertical = Math.ceil(canvas.width / a1.x);
        var nMax = Math.ceil(canvas.height / a2.y);
        //if(a2.x < 0)
        //let mMin = Math.min(0, -mMax); //TODO this tries to plot a lot outside, so might not be efficient
        //let nMin = Math.min(0, -nMax);
        for (var n = 0; n <= nMax; n++) {
            //Correcting for a2.x displacement
            var xDisplacement = n * a2.x;
            var inA1xs = xDisplacement / a1.x;
            var mMin = -Math.floor(inA1xs);
            var mMaxCorrected = mMaxIfa2IsVertical - Math.ceil(inA1xs);
            for (var m = mMin; m <= mMaxCorrected; m++) {
                var pos = TMath.Vector.add(a1.scale(m), a2.scale(n));
                pos.add(origin);
                if (insideCanvas(canvas, pos.x, pos.y)) {
                    factory.create(pos);
                }
            }
        }
    }
    TPlotters.rectangle = rectangle;
    function fillCtx(ctx, factory, a1, a2) {
        rectangle(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, factory, a1, a2);
    }
    TPlotters.fillCtx = fillCtx;
    function insideCanvas(canvas, x, y) {
        if (x < 0)
            return false;
        if (x > canvas.width)
            return false;
        if (y < 0)
            return false;
        if (y > canvas.width)
            return false;
        return true;
    }
    TPlotters.insideCanvas = insideCanvas;
})(TPlotters || (TPlotters = {}));
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
            var pos = new TMath.Vector(x, y);
            TCanvasLib.fillPolygon(pos, nSides, diameter, ctx);
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
    var Rectangle = /** @class */ (function () {
        function Rectangle(upperLeft, width, height) {
            this.pos = upperLeft;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rectangle.prototype, "left", {
            get: function () { return this.pos.x; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
            get: function () { return this.pos.y; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () { return this.pos.x + this.width; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () { return this.pos.y + this.height; },
            enumerable: false,
            configurable: true
        });
        return Rectangle;
    }());
    TPosObjects.Rectangle = Rectangle;
    var Polygon = /** @class */ (function () {
        function Polygon(ctx, n, pos, diameter, color) {
            if (diameter === void 0) { diameter = 5; }
            if (color === void 0) { color = 'blue'; }
            this.pos = pos;
            ctx.fillStyle = color;
            TCanvasLib.fillPolygon(pos, n, diameter, ctx);
        }
        return Polygon;
    }());
    TPosObjects.Polygon = Polygon;
})(TPosObjects || (TPosObjects = {}));
var TSymmetries;
(function (TSymmetries) {
    var GyrationPoint = /** @class */ (function () {
        function GyrationPoint(pos, period) {
            this.pos = pos;
            this.period = period;
            this.angle = new TMath.Angle(-2 * Math.PI / period);
        }
        //If applyToRect not set then it applies to entire canvas
        //public applyToCtx(ctx: CanvasRenderingContext2D, applyToRect: TPosObjects.Rectangle = null, drawSymmetryLines = false) {
        GyrationPoint.prototype.applyToCtx = function (ctx, radius, drawSymmetryLines, drawSrcRegion) {
            if (radius === void 0) { radius = null; }
            if (drawSymmetryLines === void 0) { drawSymmetryLines = false; }
            if (drawSrcRegion === void 0) { drawSrcRegion = false; }
            var canvasUpperLeft = new TMath.Vector(0, 0);
            if (radius == null)
                throw new Error("radius == null not implented");
            var cakeSlicePath = this.cakeSlicePath(radius);
            for (var i = 1; i < this.period; i++) {
                var angleI = new TMath.Angle(this.angle.angle * i);
                var rotation = new TCanvasClasses.Rotation(angleI, this.pos);
                TDuplication.copyRotatePasteRegion(ctx, cakeSlicePath, rotation);
            }
            if (drawSrcRegion)
                ctx.stroke(cakeSlicePath);
            if (drawSymmetryLines)
                this.drawSymmetryLines(ctx);
        };
        GyrationPoint.prototype.cakeSlicePath = function (radius) {
            var angle1 = TMath.Angle.fromRadiansFromYNeg(-this.angle.radiansFromXPos);
            var angle2 = TMath.Angle.fromRadiansFromYNeg(0);
            return TCanvasLib.cakeSlicePath(this.pos, radius, angle1, angle2);
        };
        GyrationPoint.prototype.drawSymmetryLines = function (ctx, lineL) {
            if (lineL === void 0) { lineL = null; }
            for (var i = 0; i < this.period; i++) {
                var rotationAngle = new TMath.Angle(-Math.PI / 2)
                    .add(this.angle.copy().scale(i));
                TCanvasLib.drawLineByAngle(this.pos, rotationAngle, ctx);
                if (lineL != null)
                    throw new Error("not implemented");
            }
        };
        return GyrationPoint;
    }());
    TSymmetries.GyrationPoint = GyrationPoint;
})(TSymmetries || (TSymmetries = {}));
var TSymmetryDemos;
(function (TSymmetryDemos) {
    function isleOfLegsDemo() {
        var nCanvases = 5;
        var canvasW = 1200;
        var canvasH = 800;
        var left = 20;
        var top = 80;
        var img = new Image();
        //img.crossOrigin = 'anonymous';
        //img.onload = crop;
        img.src = "../wwwroot/images/IsleOfManLeg.png";
        img.onload = function () {
            var canvases = TCanvasTagCreation.MakeCanvasColumn(nCanvases, canvasH, canvasW, left, top);
            for (var iCanvas = 0; iCanvas < nCanvases; iCanvas++) {
                //let canvas = TCanvasTagCreation.MakeCanvas(20, 80, canvasW, canvasH, true);
                var canvas = canvases[iCanvas];
                var ctx = canvas.getContext("2d");
                canvas.style.border = "1px solid black";
                var center = new TMath.Vector(canvasW / 2, canvasH / 2);
                var legPartsLength = 100;
                var footLength = 50;
                ctx.fillStyle = 'rgba(207, 20, 43, 1)';
                //ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, canvasW, canvasH);
                //ctx.strokeStyle = 'black';
                //ctx.beginPath();
                //ctx.moveTo(center.x, center.y);
                //ctx.lineTo(center.x+legPartsLength, center.y);
                //ctx.lineTo(center.x+legPartsLength, center.y-legPartsLength);
                //ctx.lineTo(center.x+legPartsLength+footLength, center.y-legPartsLength);
                //ctx.stroke();
                var rotation = new TCanvasClasses.Rotation(TMath.Angle.fromDegreesFromXPos(5), center.copyAddXY(90, -90));
                TCanvasLib.drawImage(ctx, img, center.copyAddXY(-10, -169), rotation);
                //ctx.drawImage(img, center.x, center.y - 180);
                var gPoint = new TSymmetries.GyrationPoint(center, iCanvas + 3);
                gPoint.applyToCtx(ctx, 260, false, false);
            }
        };
    }
    TSymmetryDemos.isleOfLegsDemo = isleOfLegsDemo;
    function gyrationDraggableImgDemo(img) {
        var imgJQ = $(img);
        var canvasW = 1200;
        var canvasH = 660;
        var center = new TMath.Vector(canvasW / 2, canvasH / 2);
        //var img = new Image();
        //img.src = "../wwwroot/images/CVBilledeDecLysCropped.jpg";
        //var img = document.getElementById('img-input');
        //img.onload = () => {
        var canvas = TCanvasTagCreation.MakeCanvas(10, 10, canvasW, canvasH, true);
        var ctx = canvas.getContext("2d");
        TCanvasLib.drawImgOnCanvasAsIs(ctx, img);
        var rotation = new TCanvasClasses.Rotation(TMath.Angle.fromDegreesFromXPos(5), center.copyAddXY(90, -90));
        var gPoint = new TSymmetries.GyrationPoint(center, 6);
        var gPointRadius = 1000;
        imgJQ.draggable({
            drag: function (event, ui) {
                img.style.visibility = 'hidden';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var gPointCakeSlice = gPoint.cakeSlicePath(gPointRadius);
                TCanvasLib.drawImgOnCanvasInRegionAsIs(ctx, img, gPointCakeSlice);
                gPoint.applyToCtx(ctx, gPointRadius, false, false);
            }
        });
        //imgJQ.on("dragstop", (event, ui) => {
        //    img.style.visibility = 'visible';
        //});
    }
    TSymmetryDemos.gyrationDraggableImgDemo = gyrationDraggableImgDemo;
})(TSymmetryDemos || (TSymmetryDemos = {}));
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
        //From x-axis
        Vector.fromPolar = function (a, angle) {
            return new Vector(a * angle.cos(), a * angle.sin());
        };
        Vector.prototype.copy = function () {
            return new Vector(this.x, this.y);
        };
        Vector.prototype.yNegCopy = function () {
            return new Vector(this.x, -this.y);
        };
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
        Vector.prototype.copyAddXY = function (dx, dy) {
            return new Vector(this.x + dx, this.y + dy);
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
var TCanvasTagCreation;
(function (TCanvasTagCreation) {
    function MakeCanvas(x, y, width, height, drawBorder, parentElmnt, fixCanvasDpi, zIndex) {
        if (drawBorder === void 0) { drawBorder = false; }
        if (parentElmnt === void 0) { parentElmnt = null; }
        if (fixCanvasDpi === void 0) { fixCanvasDpi = true; }
        if (zIndex === void 0) { zIndex = -1; }
        if (parentElmnt == null) {
            parentElmnt = document.body;
        }
        var canvas = document.createElement("canvas");
        canvas.style.zIndex = zIndex.toString();
        if (fixCanvasDpi)
            TCanvasLib.fixCanvasDpi(canvas);
        canvas.style.position = "absolute";
        canvas.style.left = x + 'px';
        canvas.style.top = y + 'px';
        canvas.width = width; //important to set canvas.width/height, not just canvas.style.width!
        canvas.height = height;
        parentElmnt.appendChild(canvas);
        if (drawBorder)
            canvas.style.border = "1px solid black";
        return canvas;
    }
    TCanvasTagCreation.MakeCanvas = MakeCanvas;
    function MakeCanvasColumn(n, heightOfOne, width, x, y, parentElmnt, fixCanvasDpi) {
        if (width === void 0) { width = null; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (parentElmnt === void 0) { parentElmnt = null; }
        if (fixCanvasDpi === void 0) { fixCanvasDpi = true; }
        if (width === null)
            throw new Error("notimplemented"); //TODO screen/parent width
        var yCurrent = y;
        var canvases = new Array(n);
        for (var i = 0; i < n; i++) {
            var canvas = MakeCanvas(x, yCurrent, width, heightOfOne, false, parentElmnt, fixCanvasDpi);
            yCurrent += heightOfOne;
            canvases[i] = canvas;
        }
        return canvases;
    }
    TCanvasTagCreation.MakeCanvasColumn = MakeCanvasColumn;
})(TCanvasTagCreation || (TCanvasTagCreation = {}));
var TInputLib;
(function (TInputLib) {
    function bindImgUploadToDisplayImgTag(inputElmnt, displayTag) {
        //if (typeof $ == 'undefined') {
        //    throw new Error("$ == 'undefined'");
        //}
        inputElmnt.addEventListener("change", function (e) {
            var file = inputElmnt.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                displayTag.src = reader.result.toString();
            };
            reader.readAsDataURL(file);
        });
    }
    TInputLib.bindImgUploadToDisplayImgTag = bindImgUploadToDisplayImgTag;
})(TInputLib || (TInputLib = {}));
//# sourceMappingURL=Tiling.js.map