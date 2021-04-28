namespace TDemos {
    export function CopyHexagonDemo() {
        let ctx = TCanvasLib.getDefaultCtx();


        let pos0 = new TMath.Vector(200, 100);
        TCanvasLib.strokePolygon(new TMath.Vector(200, 100), 6, 200, ctx);
        TCanvasLib.strokePolygon(new TMath.Vector(300, 100), 6, 200, ctx);
        TCanvasLib.strokePolygon(new TMath.Vector(400, 100), 6, 200, ctx);

        let recSideL = 400;

        let fromPath = TCanvasLib.polygonPathBySideL(new TMath.Vector(0, 0), 4, recSideL, 0);
        ctx.stroke(fromPath);
        let toPoint = new TMath.Vector(600, 0);
        let destinationPath = TCanvasLib.polygonPathBySideL(toPoint, 4, recSideL, 0);
        ctx.stroke(destinationPath);

        let canvas = ctx.canvas;
        //ctx.translate(toPoint.x + recSideL / 2, toPoint.y + recSideL/2);
        //ctx.rotate(Math.PI/4);
        //ctx.translate(0, 0);
        ctx.drawImage(canvas, 0, 0, recSideL, recSideL, toPoint.x, toPoint.y, recSideL, recSideL);
    }
}