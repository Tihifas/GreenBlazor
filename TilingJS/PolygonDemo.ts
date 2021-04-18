function demo1() {
    let canvas = document.querySelector('canvas');

    let canvasW = window.innerWidth; let canvasH = window.innerHeight;
    canvas.width = canvasW; canvas.height = canvasH;


    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue';

    let diameter = 100;
    let nRows = 4;
    let nColumns = 6;
    let xMin= 100;
    let xStep = 150;
    let yMin = 50;
    let yStep = 150;
    let nSides = 3;
    for (var j = 0; j < nRows; j++) {
        let y = yMin + yStep * j;
        for (var i = 0; i < nColumns; i++) {
            let x = xMin + i * xStep;
            let pos = new TMath.Vector(x, y);
            TCanvasLib.fillPolygon(pos, nSides, diameter, ctx);
            nSides++;
        }
    }

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