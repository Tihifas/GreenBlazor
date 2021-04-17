namespace TPlotters {
    //TODO: defautl a1, a2
    export function rectangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, factory: TFactories.IPosObjectFactory, a1: TMath.Vector, a2: TMath.Vector) {
        let origin = new TMath.Vector(x, y);
        let canvas = ctx.canvas;
        let mMax = Math.ceil(canvas.width / a1.x);
        let nMax = Math.ceil(canvas.height / a2.y);
        for (var n = 0; n <= nMax; n++) {
            let mMin = 0;
            let pos0: TMath.Vector;
            while (true) {
                pos0 = TMath.Vector.add(a1.scale(mMin), a2.scale(n));
                if (pos0.x > 0) {
                    mMin--;
                }
                else {
                    break;
                }
            }
            for (var m = mMin; m <= mMax; m++) {
                let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
                pos.add(origin);
                if (insideCanvas(canvas, pos.x, pos.y) || m == mMin) { //allowing the first point to be outside
                    factory.create(pos);
                }
                else {
                    break;
                }
            }
            //TODO: delete
            //let mNAME = 0;
            //while (true) {
            //    mNAME--;
            //    let xNAME = a1.x
            //    if (true) {

            //    }
            //    else {
            //        break;
            //    }

            //}
        }
    }

    export function FillCtx(ctx: CanvasRenderingContext2D, factory: TFactories.IPosObjectFactory, a1: TMath.Vector, a2: TMath.Vector) {
        rectangle(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, factory, a1, a2);
    }

    export function insideCanvas(canvas: HTMLCanvasElement, x: number, y: number) {
        if (x < 0) return false;
        if (x > canvas.width) return false;
        if (y < 0) return false;
        if (y > canvas.width) return false;
        return true;
    }
}