namespace TDuplication {
    export function copyRectAndRotate(ctx: CanvasRenderingContext2D, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, rotation: TCanvasLib.Rotation) {
        rotation.rotateCtx(ctx);
        ctx.drawImage(ctx.canvas, sx, sy, sw, sh, dx, dy, sw, sh);
    }

    //export function CopyAndTransformRegion(region: Path2D, ctx: CanvasRenderingContext2D)
    //export function rotateAroundPoint(angle: number, point: TMath.Vector, ctx: CanvasRenderingContext2D) {
    //    let cosA = Math.cos(angle);
    //    let sinA = Math.sin(angle);
    //    ctx.setTransform(cosA, -sinA, sinA, cosA, point.x, point.y);
    //}
}