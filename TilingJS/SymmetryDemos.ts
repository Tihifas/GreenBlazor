namespace TSymmetryDemos {
    export function gyrationDemo() {
        let canvasW = 1200;
        let canvasH = 800;
        let canvas = TCanvasTagCreation.MakeCanvas(20, 80, canvasW, canvasH, true);
        let ctx = canvas.getContext("2d");

        let center = new TMath.Vector(canvasW/2, canvasH/2);

        let gPoint = new TSymmetries.GyrationPoint(center, 3);
        gPoint.applyToCtx(ctx, null, true);
    }
}