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

    export interface PosDiameterColorObjectFactoryDelegate {
        (ctx: CanvasRenderingContext2D, pos: TMath.Vector, diameter: number, color: string): TPosObjects.IPosObject;
    }

    export interface VectorToScalarDelegate {
        (vec: TMath.Vector): number;
    }

    export interface VectorToStringDelegate {
        (vec: TMath.Vector): string;
    }

    export class PosDiameterColorObjectFactory implements IPosObjectFactory {
        public ctx: CanvasRenderingContext2D;
        public posObjectFactoryDelegate: PosDiameterColorObjectFactoryDelegate
            = (ctx, pos, diameter, color) => new TPosObjects.Circle(ctx, pos, diameter / 2, color); //recomended to be overwritten
        public diameterDelegate: VectorToScalarDelegate = (pos) => 5;
        public colorDelegate: VectorToStringDelegate = (pos) => 'black';

        constructor(ctx: CanvasRenderingContext2D) {
            this.ctx = ctx;
        }

        create(pos: TMath.Vector): TPosObjects.IPosObject {
            let diameter = this.diameterDelegate(pos);
            let color = this.colorDelegate(pos);
            return this.posObjectFactoryDelegate(this.ctx, pos, diameter, color);
        }

        static logisticDiameterFactory(ctx: CanvasRenderingContext2D, center: TMath.Vector, diameterMax: number  = 20, x0: number = 200, growthFactor = 0.01, color: string = "blue")
            : PosDiameterColorObjectFactory {
            let factory = new TFactories.PosDiameterColorObjectFactory(ctx);
            factory.posObjectFactoryDelegate
                = (ctx, pos, diameter, color) => new TPosObjects.Circle(ctx, pos, diameter / 2, color);
            factory.diameterDelegate = (pos) => TMath.logisticFunction(TMath.Vector.subtract(pos, center).norm(), diameterMax, x0, growthFactor);
            factory.colorDelegate = (pos) => color;
            return factory;
        }
    }
}