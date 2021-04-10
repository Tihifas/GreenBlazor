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
        let canvasHeight = canvas.height;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        //naming convention as Solid State physics s. 10
        let diameter = 1;
        let a1 = new TMath.Vector(diameter, 0);
        let a2 = new TMath.Vector(diameter / 2, diameter * 0.8);
        let mMin = -canvasWidth / a1.norm(), mMax = canvasWidth / a1.norm();
        let nMin = -canvasHeight / a2.norm(), nMax = canvasHeight / a2.norm();

        let factory = new TFactories.DelegatePosObjectFactory(ctx, (ctx, pos) => {
            let center = new TMath.Vector(0, 0);
            let dist = TMath.Vector.subtract(pos, center).norm();
            let distRelativeTo = canvasHeight;
            let capedPercentDist = Math.round(Math.min(1, dist / distRelativeTo) * 100);
            //let colorNumber = capedRelativeDist * 255;

            //let color: string = ('00' + (colorNumber).to(16)).slice(2);
            let colorPercent: string;
            if (Math.round(capedPercentDist / 4) % 2 == 0) {
                colorPercent = '0%';
            }
            else {
                colorPercent = '100%';
            }

            //let colorPercent: string = capedPercentDist.toString() + '%';


            let color: string = "rgb(" + colorPercent + "," + colorPercent + "," + colorPercent + ")";
            return new TPosObjects.Circle(ctx, pos, diameter / 2, color);
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

    export function PosDiameterColorObjectFactoryDemo() {
        let ctx = TCanvasLib.getDefaultCtx();
        let canvas = ctx.canvas;
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        //naming convention as Solid State physics s. 10
        let diameterMax = 20;
        let spacing = diameterMax;
        let a1 = new TMath.Vector(spacing, 0);
        let a2 = new TMath.Vector(spacing / 2, Math.sqrt(spacing*spacing - (spacing/2)*(spacing/2)));
        let mMin = -canvasWidth / a1.norm(), mMax = canvasWidth / a1.norm();
        let nMin = -canvasHeight / a2.norm(), nMax = canvasHeight / a2.norm();

        let center = new TMath.Vector(0,0);
        let factory = TFactories.PosDiameterColorObjectFactory.logisticDiameterFactory(ctx, center, 20);

        for (var m = mMin; m < mMax; m++) {
            for (var n = nMin; n < nMax; n++) {
                let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
                factory.create(pos);
            }
        }
    }
}