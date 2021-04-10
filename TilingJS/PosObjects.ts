namespace TPosObjects {
    export interface IPosObject {
        pos: TMath.Vector;
    }

    export class Circle implements IPosObject {
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

    export class Polygon implements IPosObject {
        pos: TMath.Vector;

        constructor(ctx: CanvasRenderingContext2D, pos: TMath.Vector, diameter: number = 5, color: string = 'black') {
            this.pos = pos;
            TCanvasLib.fillPolygon(pos, 6, diameter, ctx);
        }
    }
}