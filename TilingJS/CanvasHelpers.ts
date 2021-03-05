namespace TCanvasLib {
    export function 

    export function StrokePolygon(x: number, y: number, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = PolygonPath(x, y, nSides, diameter);
        ctx.stroke(path);
    }

    export function FillPolygon(x: number, y: number, nSides: number, diameter: number, ctx: CanvasRenderingContext2D) {
        let path = PolygonPath(x, y, nSides, diameter);
        ctx.fill(path);
    }

    export function PolygonPath(x: number, y: number, nSides: number, diameter: number) {
        let sideL = diameter * Math.sin(Math.PI / nSides);
        let turtle = new PathTurtle(x, y);
        let innerAngle = Math.PI - (Math.PI * (nSides - 2) + 0.0) / nSides;
        //TODO: remove
        let degrees = (innerAngle + 0.0) / (Math.PI * 2) * 360;

        for (var i = 0; i < nSides; i++) {
            turtle.move(sideL);
            turtle.rotate(innerAngle); //- to make it counterclickvise
        }
        return turtle.GetPath();
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

        public GetPath() {
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