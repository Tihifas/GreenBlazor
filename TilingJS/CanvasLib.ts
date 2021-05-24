namespace TCanvasLib {
    export function getDefaultCtx() {
        var canvas: HTMLCanvasElement = document.querySelector('canvas');
        return canvas.getContext('2d');
    }

    export function fixCanvasDpi(canvas: HTMLCanvasElement) {
        //Copied from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
        let dpi = window.devicePixelRatio;
        dpi = dpi * 2 / 3; //On desktop it was * 1, og laptop it was * 2/3
        //get CSS height
        //the + prefix casts it to an integer
        //the slice method gets rid of "px"
        let style_height = +window.getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
        //get CSS width
        let style_width = +window.getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
        //scale the canvas
        canvas.setAttribute('height', "" + style_height * dpi);
        canvas.setAttribute('width', "" + style_width * dpi);
    }

    //TODO: call when resizing window
    export function fixAllCanvasesDpi1() {
        let canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            fixCanvasDpi(canvas);
        }
    }

    export function fixAllCanvasesDpi2() {
        let canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            //Inspired by https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
            // Set actual size in memory (scaled to account for extra pixel density).
            var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
            canvas.width = Math.floor(canvas.width * scale);
            canvas.height = Math.floor(canvas.height * scale);

            // Normalize coordinate system to use css pixels.
            let ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
        }
    }

    export function strokePolygonBySideL(pos0: TMath.Vector, nSides: number, sideL: number, ctx: CanvasRenderingContext2D) {
        let cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        strokePolygon(pos0, nSides, cDiameter, ctx);
    }

    //cDiameter: Circumscribed diabeter https://en.wikipedia.org/wiki/Regular_polygon#Circumradius
    export function strokePolygon(pos0: TMath.Vector, nSides: number, cDiameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(pos0, nSides, cDiameter);
        ctx.stroke(path);
    }

    export function fillPolygonBySideL(pos0: TMath.Vector, nSides: number, sideL: number, ctx: CanvasRenderingContext2D) {
        let cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        fillPolygon(pos0, nSides, cDiameter, ctx);
    }

    export function fillPolygon(pos0: TMath.Vector, nSides: number, cDiameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(pos0, nSides, cDiameter);
        ctx.fill(path);
    }

    export function polygonPathBySideL(pos0: TMath.Vector, nSides: number, sideL: number, angle0Override = null) {
        let cDiameter = sideL * (1.0 / Math.sin(Math.PI / nSides));
        return polygonPath(pos0, nSides, cDiameter, angle0Override);
    }

    export function polygonPath(pos0: TMath.Vector, nSides: number, cDiameter: number, angle0Override: TMath.Angle = null) {
        let sideL = cDiameter * Math.sin(Math.PI / nSides);
        let turtle = new PathTurtle(pos0);
        let innerAngle = TMath.Angle.fromRadiansFromXPos(Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides);

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

    export function drawImage(ctx: CanvasRenderingContext2D, img: CanvasImageSource, pos: TMath.Vector, rotation: TCanvasClasses.Rotation = null) {
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

    export function drawImgOnCanvasAsIs(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
        ctx.save();

        let dx = img.offsetLeft - ctx.canvas.offsetLeft;
        let dy = img.offsetTop - ctx.canvas.offsetTop;
        ctx.drawImage(img, dx, dy, img.width, img.height);
        ctx.restore();
    }

    export function cakeSlicePath(center: TMath.Vector, radius: number, angle1: TMath.Angle, angle2: TMath.Angle)
        : Path2D {
        let path = new Path2D();
        path.moveTo(center.x, center.y);

        let toAngle1 = TMath.Vector.fromPolar(radius, angle1).yNegCopy();
        let atAngle1 = TMath.Vector.add(center, toAngle1);
        path.lineTo(atAngle1.x, atAngle1.y);

        path.arc(center.x, center.y, radius, angle1.radiansFromXNeg, angle2.radiansFromXNeg, true);

        let toAngle2 = TMath.Vector.fromPolar(radius, angle2).yNegCopy();
        let atAngle2 = TMath.Vector.add(center, toAngle2);
        path.moveTo(atAngle2.x, atAngle2.y); //Obs move to, not line to.

        path.lineTo(center.x, center.y);

        return path;
    }

    export class PathTurtle {
        private pos: TMath.Vector;
        private rotation: TMath.Angle;
        private path: Path2D;

        constructor(pos0: TMath.Vector, rotation = 0) {
            this.path = new Path2D();
            this.pos = pos0;
            this.rotation = new TMath.Angle(rotation);

            this.path.moveTo(this.pos.x, this.pos.y);
        }

        public getPath() {
            return this.path;
        }

        private lineToPos() {
            this.path.lineTo(this.pos.x, this.pos.y);
        }

        move(length: number) {
            let dPos = TMath.Vector.fromPolar(length, this.rotation);
            this.pos.add(dPos);
            this.lineToPos();
        }

        //radians
        rotate(angle: TMath.Angle) {
            this.rotation.add(angle);
        }
    }

    export function drawLineByVector(ctx: CanvasRenderingContext2D, point: TMath.Vector, vector: TMath.Vector, strokeStyle: string = null) {
        if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
        let destination = TMath.Vector.add(point, vector);

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(destination.x, destination.y);
        ctx.stroke();
    }

    export function drawLineByAngle(point: TMath.Vector, angle: TMath.Angle, ctx: CanvasRenderingContext2D, bothDirections: boolean = true, strokeStyle = null) {
        let canvas = ctx.canvas;
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        let lineLength = Math.sqrt(canvasW * canvasW + canvasH * canvasH);
        let lineVector = TMath.Vector.fromPolar(lineLength, angle);
        TCanvasLib.drawLineByVector(ctx, point, lineVector, strokeStyle);
        if (bothDirections) {
            lineVector.scale(-1);
            TCanvasLib.drawLineByVector(ctx, point, lineVector, strokeStyle);
        }
    }
}