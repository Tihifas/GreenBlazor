namespace TDemos {

    export function circleFactoryDemo() {
        let ctx = TCanvasLib.getDefaultCtx();
        ctx.translate(25, 25);
        let factory = new TFactories.CircleFactory(ctx);

        //naming convention as Solid State physics s. 10
        let a1 = new TMath.Vector(100, 0);
        let a2 = new TMath.Vector(50, 200);
        let mMin = 0, mMax = 8;
        let nMin = 0, nMax = 8;
        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }

    export function posObjectFactoryDemo() {
        let ctx = TCanvasLib.getDefaultCtx();
        let canvas = ctx.canvas;
        let canvasWidth = canvas.width;
        let canvasHeight= canvas.height;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        //naming convention as Solid State physics s. 10
        let a1 = new TMath.Vector(30, 0);
        let a2 = new TMath.Vector(15, 25);
        let mMin = -canvasWidth / a1.norm(), mMax = canvasWidth / a1.norm();
        let nMin = -canvasHeight / a2.norm(), nMax = canvasHeight / a2.norm();

        let factory = new TFactories.DelegatePosObjectFactory(ctx, (ctx, pos) => {
            let center = new TMath.Vector(0,0);
            let dist = TMath.Vector.subtract(pos, center).norm();
            let distRelativeTo = canvasHeight;
            let capedPercentDist = Math.round(Math.min(1, dist / distRelativeTo) * 100);
            //let colorNumber = capedRelativeDist * 255;

            //let color: string = ('00' + (colorNumber).to(16)).slice(2);

            let colorPercent: string = capedPercentDist.toString() + '%';

            let color: string = "rgb(" + colorPercent + "," + colorPercent + "," + colorPercent + ")";
            let r = Math.round(a1.norm()/2);
            return new TPosObjects.Circle(ctx, pos, r, color);
        });

        
        //let mMin = -20, mMax = 20;
        //let nMin = -20, nMax = 20;
        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }
}