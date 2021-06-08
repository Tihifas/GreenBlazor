namespace TPlane {
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

    //I want this in other layer, but got "Use of line before declaration error"
    export class CanvasLine extends Line {
        constructor(point: TMath.Vector, angle: TMath.Angle, draw: boolean = true) {
            super(point, angle);
            if (draw) this.draw();
        }

        public draw() {

        }

        static drawLineByVector(ctx: CanvasRenderingContext2D, point: TMath.Vector, vector: TMath.Vector, strokeStyle: string = null) {
            if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
            let destination = TMath.Vector.add(point, vector);

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(destination.x, destination.y);
            ctx.stroke();
        }

        static drawLineByAngle(point: TMath.Vector, angle: TMath.Angle, ctx: CanvasRenderingContext2D, bothDirections: boolean = true, strokeStyle = null) {
            let canvas = ctx.canvas;
            let canvasW = canvas.width;
            let canvasH = canvas.height;
            let lineLength = Math.sqrt(canvasW * canvasW + canvasH * canvasH);
            let lineVector = TMath.Vector.fromPolar(lineLength, angle);
            CanvasLine.drawLineByVector(ctx, point, lineVector, strokeStyle);
            if (bothDirections) {
                lineVector.scale(-1);
                CanvasLine.drawLineByVector(ctx, point, lineVector, strokeStyle);
            }
        }
    }
}