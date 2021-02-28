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

class PathTurtle {
    pos: TMath.Vector;
    rotation: number; //radians
    path: Path2D;

    constructor(path: Path2D, x: number, y: number, rotation = 0) {
        this.path = path;
        this.pos = new TMath.Vector(x, y);
        this.rotation = rotation;
    }

    private pathToPos() {
        this.path.moveTo(this.pos.x, this.pos.y);
    }

    move(length: number) {
        let dPos = TMath.Vector.fromRotationAndLength(this.rotation);
        this.pos.add(dPos);
        this.pathToPos();
    }

    //radians
    rotate(angle: number) {
        this.rotation += angle;
    }
}