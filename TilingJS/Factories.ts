namespace TFactories {
    //TODO: move
    export interface IPositionedObject {
        pos: TMath.Vector;
    }

    export class Circle implements IPositionedObject {
        pos: TMath.Vector;

        constructor(ctx: CanvasRenderingContext2D, pos: TMath.Vector, radius: number = 5, color: string = 'black') {
            this.pos = pos;
            //for better performance use cavasdata? https://stackoverflow.com/questions/7812514/drawing-a-dot-on-html5-canvas
            //ctx.fillRect(pos.x, pos.y, 1, 1);

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    export interface IPositionedObjectFactory {
        create(pos: TMath.Vector): IPositionedObject;
    }

    export class CircleFactory implements IPositionedObjectFactory {
        ctx: CanvasRenderingContext2D;
        r: number;
        color: string;

        constructor(ctx: CanvasRenderingContext2D, r: number = 5, color: string = 'black') {
            this.ctx = ctx;
            this.r = r;
        }

        create(pos: TMath.Vector) {
            let point = new Circle(this.ctx, pos, this.r, this.color);
            return point;
        }
    }
}