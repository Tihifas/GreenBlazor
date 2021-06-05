namespace TMath {
    export class Line {
        point: TMath.Vector;
        parallelVector: TMath.Vector;
        angle: TMath.Angle;

        constructor(point: TMath.Vector, angle: TMath.Angle) {
            this.point = point;
            this.angle = angle;
            this.parallelVector = new TMath.Vector(Math.cos(angle.degreesFromXPos), Math.sin(angle.degreesFromXPos));
        }
    }
}