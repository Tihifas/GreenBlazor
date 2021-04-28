namespace TDemos {
    export function CopyHexagonDemo() {
        let ctx = TCanvasLib.getDefaultCtx();


        let pos0 = new TMath.Vector(200, 100);
        TCanvasLib.strokePolygon(pos0, 6, 200, ctx);

        let recSideL = 400;

        let fromPath = TCanvasLib.polygonPathBySideL(new TMath.Vector(0, 0), 4, recSideL, 0);
        ctx.stroke(fromPath);
        let toPoint = new TMath.Vector(recSideL, 0);
        let destinationPath = TCanvasLib.polygonPathBySideL(toPoint, 4, recSideL, 0);
        ctx.stroke(destinationPath);

        let canvas = ctx.canvas;
        ctx.drawImage(canvas, 0, 0, recSideL, recSideL, recSideL, 0, recSideL, recSideL);
    }
}