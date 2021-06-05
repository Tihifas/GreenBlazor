namespace TCanvasClasses {
    export class Rotation {
        rotationPoint: TMath.Vector;
        angle: TMath.Angle;
        constructor(angle: TMath.Angle, rotationPoint: TMath.Vector) {
            this.angle = angle;
            this.rotationPoint = rotationPoint;
        }

        //Just rotates ctx around roration point, does not draw anything
        applyToCtx(ctx: CanvasRenderingContext2D) {
            ctx.translate(this.rotationPoint.x, this.rotationPoint.y);
            ctx.rotate(this.angle.radiansFromXNeg);
            ctx.translate(-this.rotationPoint.x, -this.rotationPoint.y);
        }
    }
}