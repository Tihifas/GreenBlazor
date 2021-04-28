namespace TPlotters {
    //TODO: defautl a1, a2
    export function rectangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, factory: TFactories.IPosObjectFactory, a1: TMath.Vector, a2: TMath.Vector) {
        let origin = new TMath.Vector(x, y);
        let canvas = ctx.canvas;
        let mMaxIfa2IsVertical = Math.ceil(canvas.width / a1.x);
        let nMax = Math.ceil(canvas.height / a2.y);
        //if(a2.x < 0)
        //let mMin = Math.min(0, -mMax); //TODO this tries to plot a lot outside, so might not be efficient
        //let nMin = Math.min(0, -nMax);
        for (var n = 0; n <= nMax; n++) {
            //Correcting for a2.x displacement
            let xDisplacement = n * a2.x
            let inA1xs = xDisplacement / a1.x;
            let mMin = -Math.floor(inA1xs);
            let mMaxCorrected = mMaxIfa2IsVertical - Math.ceil(inA1xs);

            for (var m = mMin; m <= mMaxCorrected; m++) {
                let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
                pos.add(origin);
                if (insideCanvas(canvas, pos.x, pos.y)) {
                    factory.create(pos);
                }
            }
        }
    }

    export function fillCtx(ctx: CanvasRenderingContext2D, factory: TFactories.IPosObjectFactory, a1: TMath.Vector, a2: TMath.Vector) {
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