function demo1() {
    let canvas = document.querySelector('canvas');

    let canvasW = window.innerWidth; let canvasH = window.innerHeight;
    canvas.width = canvasW; canvas.height = canvasH;

    let path = new Path2D();
    path.ellipse(150, 150, 100, 150, 0, 0, Math.PI*2);


    let ctx = canvas.getContext('2d');
    ctx.stroke(path);

    //let image = document.querySelector('img');
    //let sd = new ImageDrawer(ctx, image, 400);
    //sd.draw(50, 50);

    //let images = document.querySelectorAll('img');

    //let xMin: number = 100;
    //let xStep: number = 100;
    //for (var i = 0; i < images.length; i++) {
    //    let x = xMin + i * xStep;
    //    let y = 100;
    //    let image = images[i];
    //    let sd = new ImageDrawer(ctx, image);
    //    sd.draw(x, y);
    //}

    //let sd = new SimpleDrawable(
    //ctx);
    //for (var x = xMin; x <= xMax; x += xStep) {
    //    sd.draw(x, 50);
    //}
}