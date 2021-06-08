namespace TSymmetryDemos {
    export function CanvasManagerDemo(img: HTMLImageElement) {
        let canvasx0 = 50;
        let canvasy0 = 50;
        let canvasWidth = 1200;
        let canvasHeight = 500;

        let canvas = TCanvasTagCreation.MakeCanvas(canvasx0, canvasy0, canvasWidth, canvasHeight, true);
        let ctx = canvas.getContext('2d');

        TCanvasLib.drawImgOnCanvasAsIs(ctx as CanvasRenderingContext2D, img);

        let center = new TMath.Vector(canvasWidth / 2, canvasHeight / 2);

        let canvasOperation: TCanvasLib.CanvasOperation = new TSymmetries.GyrationPoint(center, 6)


        let canvasManager = new TCanvasLib.CanvasManager(canvas);
        canvasManager.AddCanvasOperation(canvasOperation);
    }
}