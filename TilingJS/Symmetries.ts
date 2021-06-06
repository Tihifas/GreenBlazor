namespace TSymmetries {
    export class GyrationPoint {
        pos: TMath.Vector;
        period: number;
        angle: TMath.Angle;

        constructor(pos: TMath.Vector, period: number) {
            this.pos = pos;
            this.period = period;
            this.angle = new TMath.Angle(-2 * Math.PI / period);
        }

        //If applyToRect not set then it applies to entire canvas
        //public applyToCtx(ctx: CanvasRenderingContext2D, applyToRect: TPosObjects.Rectangle = null, drawSymmetryLines = false) {
        public applyToCtx(ctx: CanvasRenderingContext2D, radius: number = null, drawSymmetryLines = false, drawSrcRegion = false)
        {
            let canvasUpperLeft = new TMath.Vector(0, 0);
            if (radius == null) throw new Error("radius == null not implented");

            let cakeSlicePath = this.cakeSlicePath(radius);

            for (var i = 1; i < this.period; i++) {
                let angleI = new TMath.Angle(this.angle.angle * i);
                let rotation = new TCanvasClasses.Rotation(angleI, this.pos);

                TDuplication.copyRotatePasteRegion(ctx, cakeSlicePath, rotation);
            }

            if (drawSrcRegion) ctx.stroke(cakeSlicePath);   
            if (drawSymmetryLines) this.drawSymmetryLines(ctx);
        }

        public cakeSlicePath(radius: number): Path2D {
            let angle1 = TMath.Angle.fromRadiansFromYNeg(-this.angle.radiansFromXPos);
            let angle2 = TMath.Angle.fromRadiansFromYNeg(0);
            return TCanvasLib.cakeSlicePath(this.pos, radius, angle1, angle2);
        }

        public drawSymmetryLines(ctx: CanvasRenderingContext2D, lineL: number = null) {
            for (var i = 0; i < this.period; i++) {
                let rotationAngle = new TMath.Angle(-Math.PI/2)
                                        .add(this.angle.copy().scale(i));

                TCanvasClasses.CanvasLine.drawLineByAngle(this.pos, rotationAngle, ctx);
                if (lineL != null) throw new Error("not implemented");
            }
        }
    }
}