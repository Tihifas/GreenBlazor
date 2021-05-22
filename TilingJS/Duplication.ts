namespace TDuplication {
    export function copyRotatePasteRect(ctx: CanvasRenderingContext2D, sourceRect: TPosObjects.Rectangle, dx: number, dy: number, rotation: TCanvasClasses.Rotation) {
        rotation.applyToCtx(ctx);
        ctx.drawImage(ctx.canvas, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height,
                        dx, dy, sourceRect.width, sourceRect.height);
        ctx.resetTransform();
    }

    export function copyRotatePasteRegion(ctx: CanvasRenderingContext2D, srcRegionOutline: Path2D, rotation: TCanvasClasses.Rotation) {
        //cut image
        rotation.applyToCtx(ctx);
        //paste cut image
        ctx.resetTransform();
    }

    //function crop() {
    //    cw = canvas.width = img.width;
    //    ch = canvas.height = img.height;

    //    let path = TCanvasLib.polygonPath(new TMath.Vector(60, 3), 6, 200);
    //    ctx.strokeStyle = 'black';
    //    ctx.lineWidth = 6;
    //    ctx.stroke(path);
    //    ctx.clip(path);

    //    ctx.drawImage(img, 0, 0);
    //}

}