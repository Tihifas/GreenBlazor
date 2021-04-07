namespace TCanvasLib {
    export function getDefaultCtx() {
        var canvas: HTMLCanvasElement = document.querySelector('canvas');
        return canvas.getContext('2d');
    }

    export function fixAllCanvasesDpi() {
        let canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            //Copied from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
            let dpi = window.devicePixelRatio;
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
    }

    export function strokePolygon(x: number, y: number, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(x, y, nSides, diameter);
        ctx.stroke(path);
    }

    export function fillPolygon(x: number, y: number, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(x, y, nSides, diameter);
        ctx.fill(path);
    }

    export function polygonPath(x: number, y: number, nSides: number, diameter: number) {
        let sideL = diameter * Math.sin(Math.PI / nSides);
        let turtle = new PathTurtle(x, y);
        let innerAngle = Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides;
        //TODO: remove
        let degrees = (innerAngle + 0.0) / (Math.PI * 2) * 360;

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

        constructor(x: number, y: number, rotation = 0) {
            this.path = new Path2D();
            this.pos = new TMath.Vector(x, y);
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
            //todo delete
            //let canvas = document.querySelector('canvas');
            //let ctx = canvas.getContext('2d');
            //ctx.moveTo(this.pos.x, this.pos.y);

            let dPos = TMath.Vector.fromRotationAndLength(this.rotation, length);
            this.pos.add(dPos);

            //todo delete
            //ctx.lineTo(this.pos.x, this.pos.y);
            //ctx.stroke();

            this.lineToPos();
        }

        //radians
        rotate(angle: number) {
            this.rotation += angle;
        }
    }
}