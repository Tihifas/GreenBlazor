namespace TSymmetryDemos {
    export function isleOfLegsDemo() {
        let nCanvases = 5;
        let canvasW = 1200;
        let canvasH = 800;
        let left = 20;
        let top = 80;

        var img = new Image();
        //img.crossOrigin = 'anonymous';
        //img.onload = crop;
        img.src = "../wwwroot/images/IsleOfManLeg.png";
        img.onload = () => {

            let canvases = TCanvasTagCreation.MakeCanvasColumn(nCanvases, canvasH, canvasW, left, top);
            for (var iCanvas = 0; iCanvas < nCanvases; iCanvas++) {

                //let canvas = TCanvasTagCreation.MakeCanvas(20, 80, canvasW, canvasH, true);
                let canvas = canvases[iCanvas];
                let ctx = canvas.getContext("2d");
                canvas.style.border = "1px solid black";

                let center = new TMath.Vector(canvasW / 2, canvasH / 2);

                let legPartsLength = 100;
                let footLength = 50;

                ctx.fillStyle = 'rgba(207, 20, 43, 1)';
                //ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, canvasW, canvasH);

                //ctx.strokeStyle = 'black';
                //ctx.beginPath();
                //ctx.moveTo(center.x, center.y);
                //ctx.lineTo(center.x+legPartsLength, center.y);
                //ctx.lineTo(center.x+legPartsLength, center.y-legPartsLength);
                //ctx.lineTo(center.x+legPartsLength+footLength, center.y-legPartsLength);
                //ctx.stroke();


                let rotation = new TCanvasClasses.Rotation(TMath.Angle.fromDegreesFromXPos(5), center.copyAddXY(90, -90));
                TCanvasLib.drawImage(ctx, img, center.copyAddXY(-10, -169), rotation);
                //ctx.drawImage(img, center.x, center.y - 180);

                let gPoint = new TSymmetries.GyrationPoint(center, iCanvas+3);
                gPoint.applyToCtx(ctx, 260, false, false);
            }
        }
    }
}