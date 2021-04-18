namespace TCanvasLib {
    export function getDefaultCtx() {
        var canvas: HTMLCanvasElement = document.querySelector('canvas');
        return canvas.getContext('2d');
    }

    //TODO: call when resizing window
    export function fixAllCanvasesDpi1() {
        let canvases = document.getElementsByTagName("canvas");
        for (var i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            //Copied from https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
            let dpi = window.devicePixelRatio;
            dpi = dpi * 2/3; //On desktop it was * 1, og laptop it was * 2/3
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

    export function strokePolygon(vec: TMath.Vector, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(vec, nSides, diameter);
        ctx.stroke(path);
    }

    export function fillPolygon(pos0: TMath.Vector, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = polygonPath(pos0, nSides, diameter);
        ctx.fill(path);
    }

    export function polygonPath(vec: TMath.Vector, nSides: number, diameter: number) {
        let sideL = diameter * Math.sin(Math.PI / nSides);
        let turtle = new PathTurtle(vec);
        let innerAngle = Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides;

        turtle.rotate(innerAngle/2); //default Rotated because hexagonal packing is easier

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