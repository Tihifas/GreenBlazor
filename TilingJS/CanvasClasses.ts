namespace TCanvasClasses {
    export class Rotation {
        rotationPoint: TMath.Vector;
        angle: TMath.Angle;
        constructor(angle: TMath.Angle, rotationPoint: TMath.Vector) {
            this.angle = angle;
            this.rotationPoint = rotationPoint;
        }

        public static fromRadiansFromYNeg(radians, rotationPoint: TMath.Vector) {
            let angle = TMath.Angle.fromRadiansFromYNeg(radians);
            return new Rotation(angle, rotationPoint);
        }

        applyToCtx(ctx: CanvasRenderingContext2D) {
            ctx.translate(this.rotationPoint.x, this.rotationPoint.y);
            ctx.rotate(this.angle.radiansFromXNeg);
            ctx.translate(-this.rotationPoint.x, -this.rotationPoint.y);
        }
    }

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
}