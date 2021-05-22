namespace TSymmetryDemos {
    export function gyrationDemo() {
        let canvasW = 1200;
        let canvasH = 800;
        let canvas = TCanvasTagCreation.MakeCanvas(20, 80, canvasW, canvasH, true);
        let ctx = canvas.getContext("2d");

        let center = new TMath.Vector(canvasW / 2, canvasH / 2);

        let legPartsLength = 100;
        let footLength = 50;

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x+legPartsLength, center.y);
        ctx.lineTo(center.x+legPartsLength, center.y-legPartsLength);
        ctx.lineTo(center.x+legPartsLength+footLength, center.y-legPartsLength);
        ctx.stroke();

        let gPoint = new TSymmetries.GyrationPoint(center, 3);
        gPoint.applyToCtx(ctx, null, true);
    }
}