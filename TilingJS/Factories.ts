namespace TFactories {

    //MAKE FACTORIES USING BUILDER PATTERN?

    //TODO: move
    export interface IPosObjectFactory {
        create(pos: TMath.Vector): TPosObjects.IPosObject;
    }

    export class CircleFactory implements IPosObjectFactory {
        ctx: CanvasRenderingContext2D;
        r: number;
        color: string;

        constructor(ctx: CanvasRenderingContext2D, r: number = 5, color: string = 'black') {
            this.ctx = ctx;
            this.r = r;
        }

        create(pos: TMath.Vector) {
            let point = new TPosObjects.Circle(this.ctx, pos, this.r, this.color);
            return point;
        }
    }

    /*
     FactoryType factory = new FactoryType(
        (pos, color) => new ColoredObject(pos, color)
     )
     
     */

    /*
     function GetNamePart(cust: Customer, nameProcessor: (cust: Customer) => string): string
{
  return nameProcessor(cust);
}
     */

    export interface PosObjectFactoryDelegate {
        (ctx: CanvasRenderingContext2D, pos: TMath.Vector): TPosObjects.IPosObject;
    }

    export class DelegatePosObjectFactory implements IPosObjectFactory {
        ctx: CanvasRenderingContext2D;
        posObjectFactoryDelegate: PosObjectFactoryDelegate;

        constructor(ctx: CanvasRenderingContext2D,
            posObjectFactoryDelegate: (ctx: CanvasRenderingContext2D, pos: TMath.Vector) => TPosObjects.IPosObject) {
            this.ctx = ctx,
            this.posObjectFactoryDelegate = posObjectFactoryDelegate;
        }

        create(pos: TMath.Vector): TPosObjects.IPosObject {
            return this.posObjectFactoryDelegate(this.ctx, pos);
        }
    }
}