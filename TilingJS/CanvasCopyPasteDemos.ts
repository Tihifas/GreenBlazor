namespace TDemos {
    export function CopyHexagonDemo() {
        //let nCanvases = 10;
        let nCanvases = 1;
        let canvasHeight = 400;
        let canvasWidth = 800;
        let left = 50;
        let top = 100;

        //let canvases = TCanvasTagCreation.MakeCanvasColumn(nCanvases, canvasHeight, canvasWidth, left, top);
        for (var i = 0; i < nCanvases; i++) {
            //let canvas = TCanvasTagCreation.MakeCanvas(left, top, canvasWidth, canvasHeight);
            ////let canvas = canvases[i];
            //let ctx = canvas.getContext("2d");

            let ctx = TCanvasLib.getDefaultCtx();
            let canvas = ctx.canvas;

            canvas.style.border = "1px solid black";

            ctx.fillStyle = 'black';
            let arrowTip = new TMath.Vector(canvasHeight / 3, canvasWidth / 4);
            ctx.fillRect(200, 200, 50, 50);
            ctx.fillRect(arrowTip.x, arrowTip.y, 10, canvasHeight/3);
            TCanvasLib.fillPolygonBySideL(arrowTip, 4, 20, ctx);

            //let pos0 = new TMath.Vector(200, 100);
            //TCanvasLib.strokePolygon(new TMath.Vector(200, 100), 6, 200, ctx);
            //TCanvasLib.strokePolygon(new TMath.Vector(300, 100), 6, 200, ctx);
            //TCanvasLib.strokePolygon(new TMath.Vector(400, 100), 6, 200, ctx);

            //let recSideL = 400;

            //let fromPath = TCanvasLib.polygonPathBySideL(new TMath.Vector(0, 0), 4, recSideL, 0);
            //ctx.stroke(fromPath);
            //let toPoint = new TMath.Vector(600, 0);
            //let destinationPath = TCanvasLib.polygonPathBySideL(toPoint, 4, recSideL, 0);
            //ctx.stroke(destinationPath);

            ////ctx.translate(toPoint.x + recSideL / 2, toPoint.y + recSideL/2);
            //ctx.rotate(Math.PI / 4);
            ////ctx.translate(0, 0);
            //ctx.drawImage(canvas, 0, 0, recSideL, recSideL, toPoint.x, toPoint.y, recSideL, recSideL);
        }
    }
}