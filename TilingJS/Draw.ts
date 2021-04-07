//TODO: abandoned this, using factories instead
interface IDrawable {
    draw(x: number, y: number);
}

//Draw in constructor instead?
class SimpleDrawable implements IDrawable {
    private ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    draw(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}

class ImageDrawer implements IDrawable {
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D;
    width: number;

    constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number) {
        this.ctx = ctx;
        this.image = image;
        this.width = width;
    }

    draw(x: number, y: number) {

        let height = this.width * (this.image.height + 0.0) / this.image.width;
        this.ctx.drawImage(this.image, x, y, this.width, height);
        //this.image.addEventListener('load', e => {
        //    alert('draw' + this.image);
        //    this.ctx.drawImage(this.image, x, y, 50, 50);
        //});
    }
}


class ClipDrawer implements IDrawable {
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    width: number;

    constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number) {
        this.ctx = ctx;
        this.image = image;
        this.width = width;
    }

    draw(x: number, y: number) {
        let height = this.width * (this.image.height + 0.0) / this.image.width;
        this.ctx.drawImage(this.image, x, y, this.width, height);
    }
}