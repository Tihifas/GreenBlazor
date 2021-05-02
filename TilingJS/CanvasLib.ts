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

    export function polygonPath(pos0: TMath.Vector, nSides: number, cDiameter: number, angle0Override = null) {
        let sideL = cDiameter * Math.sin(Math.PI / nSides);
        let turtle = new PathTurtle(pos0);
        let innerAngle = Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides;

        if (angle0Override === null) {
            turtle.rotate(innerAngle / 2); //default Rotated because hexagonal packing is easier
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

    export class PathTurtle {
        private pos: TMath.Vector;
        private rotation: number; //radians
        private path: Path2D;

        constructor(pos0: TMath.Vector, rotation = 0) {
            this.path = new Path2D();
            this.pos = pos0;
            this.rotation = rotation;

            this.path.moveTo(this.pos.x, this.pos.y);
        }

        public getPath() {
            return this.path;
        }

        private lineToPos() {
            this.path.lineTo(this.pos.x, this.pos.y);
        }

        move(length: number) {
            let dPos = TMath.Vector.fromRotationAndLength(this.rotation, length);
            this.pos.add(dPos);
            this.lineToPos();
        }

        //radians
        rotate(angle: number) {
            this.rotation += angle;
        }
    }

    export function drawLine(ctx: CanvasRenderingContext2D, point: TMath.Vector, parallelVector: TMath.Vector, strokeStyle: string = null) {
        if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
        ctx.moveTo(point.x, point.y);
        ctx.beginPath();
        let destination = TMath.Vector.add(point, parallelVector);
        ctx.moveTo(destination.x, destination.y);
        ctx.stroke();
    }
}