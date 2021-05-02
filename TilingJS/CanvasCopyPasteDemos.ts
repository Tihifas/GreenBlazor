namespace TDemos {
    export function CopyHexagonDemo() {
        let nCanvases = 10;
        let canvasHeight = 400;
        let canvasWidth = 800;
        let left = 50;
        let top = 100;

        let canvases = TCanvasTagCreation.MakeCanvasColumn(nCanvases, canvasHeight, canvasWidth, left, top);
        for (var i = 0; i < nCanvases; i++) {
            //let canvas = TCanvasTagCreation.MakeCanvas(left, top, canvasWidth, canvasHeight);
            let canvas = canvases[i];
            let ctx = canvas.getContext("2d");

            //let ctx = TCanvasLib.getDefaultCtx();
            //let canvas = ctx.canvas;
            //TCanvasLib.fixCanvasDpi(canvas);

            //ctx.fillStyle = 'blue';
            //ctx.fillRect(0, 0, canvasWidth/2, canvasHeight);


            ctx.fillRect(canvasWidth / 2, 0, 2, canvasHeight);

            canvas.style.border = "1px solid black";

            drawArrow(canvasWidth, canvasHeight, ctx);

            let rotationPoint0 = new TMath.Vector(canvasWidth / 4, canvasHeight / 2);
            new TPosObjects.Circle(ctx, rotationPoint0, 10, 'red');

            let recSideL = canvasWidth / 2;
            let toPoint = new TMath.Vector(recSideL, 0);

            let translationVector = new TMath.Vector(canvasWidth/2, 0);
            let rotationPointReal = TMath.Vector.add(rotationPoint0, translationVector);
            let angle = Math.PI / 8 * i;

            let rotation = new TCanvasLib.Rotation(angle, rotationPointReal);

            TDuplication.copyRectAndRotate(ctx, 0, 0, recSideL - 2, recSideL - 2, toPoint.x, toPoint.y, rotation);
        }
    }

    function drawArrow(canvasWidth: number, canvasHeight: number, ctx: CanvasRenderingContext2D) {
        let arrowCenter = new TMath.Vector(canvasWidth/4, canvasHeight/2);
        let arrowWidth = 20;
        let arrowLength = canvasHeight / 4;

        let arrowPointSideL = 10;
        let arrowTip = new TMath.Vector(arrowCenter.x, arrowCenter.y - arrowLength/2 - arrowPointSideL);
        ctx.fillRect(arrowCenter.x - arrowWidth / 4, arrowCenter.y - arrowLength/2, arrowPointSideL, arrowLength);
        TCanvasLib.fillPolygonBySideL(arrowTip, 4, 20, ctx);

        return arrowTip;
    }
}