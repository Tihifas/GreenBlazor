namespace TCanvasClasses {
    export class Rotation {
        angle: number;
        rotationPoint: TMath.Vector;
        constructor(angle: number, rotationPoint: TMath.Vector) {
            this.angle = angle;
            this.rotationPoint = rotationPoint;
        }

        rotateCtx(ctx: CanvasRenderingContext2D) {
            ctx.translate(this.rotationPoint.x, this.rotationPoint.y);
            ctx.rotate(-this.angle); //- because default is clockwise
            ctx.translate(-this.rotationPoint.x, -this.rotationPoint.y);
        }
    }

    export class Line {
        point: TMath.Vector;
        angle: number;
        parallelVector: TMath.Vector;

        constructor(point: TMath.Vector, angle: number) {
            this.point = point;
            this.angle = angle;
            this.parallelVector = new TMath.Vector(Math.cos(angle), Math.sin(angle));
        }

        public drawOnCtx(ctx: CanvasRenderingContext2D) {
            let canvas = ctx.canvas;
            let canvasW = canvas.width;
            let canvasH = canvas.height;
            let lineLength = new TMath.Vector(canvasW, canvasH).norm();
            let lineVector = this.parallelVector.copy().scale(lineLength/2);
            TCanvasLib.drawLine(ctx, this.point, lineVector);
            lineVector.scale(-1);
            TCanvasLib.drawLine(ctx, this.point, lineVector);
        }

        public static drawLineOnCtx(point: TMath.Vector, angle: number, ctx: CanvasRenderingContext2D): Line {
            let line = new Line(point, angle);
            line.drawOnCtx(ctx);
        }
    }
}