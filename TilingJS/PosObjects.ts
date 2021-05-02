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

    export class Rectangle implements IPosObject {
        public pos: TMath.Vector;
        public width: number;
        public height: number;
        get left(): number { return this.pos.x; }
        get top(): number { return this.pos.y; }
        get right(): number { return this.pos.x + this.width; }
        get bottom(): number { return this.pos.y + this.height; }


        constructor(upperLeft: TMath.Vector, width: number, height: number) {
            this.pos = upperLeft;
            this.width = width;
            this.height = height;
        }
    }

    export class Polygon implements IPosObject {
        pos: TMath.Vector;

        constructor(ctx: CanvasRenderingContext2D, n: number, pos: TMath.Vector, diameter: number = 5, color: string = 'blue') {
            this.pos = pos;
            ctx.fillStyle = color;
            TCanvasLib.fillPolygon(pos, n, diameter, ctx);
        }
    }
}