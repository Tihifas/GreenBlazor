namespace TPlotterDemos {
    export function mouseDemo() {
        let mouse = new TMath.Vector(undefined, undefined);

        let ctx = TCanvasLib.getDefaultCtx();

        //TODO canvas gradient https://www.youtube.com/watch?v=Ug8u_raENl8


        //naming as https://en.wikipedia.org/wiki/Hexagon
        let d = 20; //inner circle diameter = x spacing
        let a2y = Math.sqrt(d*d - (d/2)*(d/2));

        //Hexagonal close packing (also works with circles)
        let a1 = new TMath.Vector(d, 0);
        let a2 = new TMath.Vector(d/2, a2y);
        let D = 2 / Math.sqrt(3) * d; //circumscribed circle diameter = hexagon "diameter"
        function draw(mouse) {
            //let factory = new TFactories.CircleFactory(ctx);
            //factory.create(mouse);
            let factory = TFactories.PosDiameterColorObjectFactory.logisticColorHexagonFactory(ctx, mouse, D);
            TPlotters.fillCtx(ctx, factory, a1, a2);
        }

        //draw(new TMath.Vector(0,0));

        window.addEventListener('mousemove',
            function (event) {
                let canvas = ctx.canvas;
                mouse.x = event.x;
                mouse.y = event.y;
                mouse.x = mouse.x - canvas.offsetLeft;
                mouse.y = mouse.y - canvas.offsetTop;

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                draw(mouse);
                console.log(mouse);
            });

    }
}