﻿namespace TSymmetryDemos {
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

                let gPoint = new TSymmetries.GyrationPoint(center, iCanvas + 3);
                gPoint.applyToCtx(ctx, 260, false, false);
            }
        }
    }

    export function gyrationDraggableImgDemo(img: HTMLImageElement) {
        let imgJQ = $(img);

        let canvasW = 1200;
        let canvasH = 660;
        let center = new TMath.Vector(canvasW / 2, canvasH / 2);

        //var img = new Image();
        //img.src = "../wwwroot/images/CVBilledeDecLysCropped.jpg";
        //var img = document.getElementById('img-input');
        //img.onload = () => {
        let canvas = TCanvasTagCreation.MakeCanvas(10, 10, canvasW, canvasH, true);
        let ctx = canvas.getContext("2d");

        TCanvasLib.drawImgOnCanvasAsIs(ctx, img);

        let rotation = new TCanvasClasses.Rotation(TMath.Angle.fromDegreesFromXPos(5), center.copyAddXY(90, -90));
        let gPoint = new TSymmetries.GyrationPoint(center, 6);
        let gPointRadius = 1000;

        imgJQ.draggable({
            drag: function (event, ui) {
                img.style.visibility = 'hidden';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let gPointCakeSlice = gPoint.cakeSlicePath(gPointRadius);
                TCanvasLib.drawImgOnCanvasInRegionAsIs(ctx, img, gPointCakeSlice);
                gPoint.applyToCtx(ctx, gPointRadius, false, false);
            }
        });

        //imgJQ.on("dragstop", (event, ui) => {
        //    img.style.visibility = 'visible';
        //});
    }
}