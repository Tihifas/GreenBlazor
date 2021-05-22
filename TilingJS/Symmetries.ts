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
        public applyToCtx(ctx: CanvasRenderingContext2D, applyToRect: TPosObjects.Rectangle = null, drawSymmetryLines = false) {
                let canvasUpperLeft = new TMath.Vector(0, 0);
            if (applyToRect != null) throw new Error("applyToRect != null not implented");
            else {
                let width = ctx.canvas.width;
                let height = ctx.canvas.height;
                applyToRect = new TPosObjects.Rectangle(canvasUpperLeft, width, height);
            }
            let rotation = new TCanvasClasses.Rotation(this.angle, this.pos);
            for (var i = 1; i < this.period; i++) {
                TDuplication.copyRotatePasteRect(ctx, applyToRect, canvasUpperLeft.x, canvasUpperLeft.y, rotation);
            }

            if (drawSymmetryLines) {
                this.drawSymmetryLines(ctx);
            }
        }

        public drawSymmetryLines(ctx: CanvasRenderingContext2D, lineL: number = null) {
            for (var i = 0; i < this.period; i++) {
                let rotationAngle = new TMath.Angle(-Math.PI/2)
                                        .add(this.angle.copy().scale(i));

                TCanvasLib.drawLineByAngle(this.pos, rotationAngle, ctx);
                if (lineL != null) throw new Error("not implemented");
            }
        }
    }
}