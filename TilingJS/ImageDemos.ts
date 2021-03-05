function cropImageDemo() {
    // canvas related variables
    var canvas: HTMLCanvasElement = document.querySelector('#cropCanvas');
    var ctx = canvas.getContext('2d');
    var cw, ch;
    //var $canvas = $("#canvas");
    //var canvasOffset = $canvas.offset();
    //var offsetX = canvasOffset.left;
    //var offsetY = canvasOffset.top;

    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = crop;
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzX5BQxG90wZnmrvCV-eNGsy-WzS6N1euyQ&usqp=CAU";

    function crop() {
        cw = canvas.width = img.width;
        ch = canvas.height = img.height;

        let path = TCanvasLib.PolygonPath(60, 3, 6, 200);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.stroke(path);
        ctx.clip(path);

        ctx.drawImage(img, 0, 0);
    }
}

function imageGalleryDemo() {
    let images = document.querySelectorAll('#imageContainer img');

    //let xMin: number = 100;
    //let xStep: number = 100;
    //for (var i = 0; i < images.length; i++) {
    //    let x = xMin + i * xStep;
    //    let y = 100;
    //    let image = images[i];
    //    let path = TCanvasLib.PolygonPath(60, 3, 6, 200);
    //    ctx.strokeStyle = 'black';
    //    ctx.lineWidth = 6;
    //    ctx.stroke(path);
    //    ctx.clip(path);

    //    ctx.drawImage(img, 0, 0);
    //}
}