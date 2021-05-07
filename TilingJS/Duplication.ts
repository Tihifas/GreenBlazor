namespace TDuplication {
    export function copyRectAndRotate(ctx: CanvasRenderingContext2D, sourceRect: TPosObjects.Rectangle, dx: number, dy: number, rotation: TCanvasClasses.Rotation) {
        rotation.applyToCtx(ctx);
        ctx.drawImage(ctx.canvas, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height,
                        dx, dy, sourceRect.width, sourceRect.height);
        ctx.resetTransform();
    }



    //export function CopyAndTransformRegion(region: Path2D, ctx: CanvasRenderingContext2D)
    //export function rotateAroundPoint(angle: number, point: TMath.Vector, ctx: CanvasRenderingContext2D) {
    //    let cosA = Math.cos(angle);
    //    let sinA = Math.sin(angle);
    //    ctx.setTransform(cosA, -sinA, sinA, cosA, point.x, point.y);
    //}
}