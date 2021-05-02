namespace TSymmetryDemos {
    export function gyrationDemo() {
        let canvasW = 1200;
        let canvasH = 800;
        let canvas = TCanvasTagCreation.MakeCanvas(0, 0, 1200, canvasW);
        let ctx = canvas.getContext("2d");

        let center = new TMath.Vector(canvasW/2, canvasH/2);

        let gPoint = new TSymmetries.GyrationPoint(center, 3);


    }
}