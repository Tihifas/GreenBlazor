namespace TPlotterDemos {
    export function mouseDemo() {
        let mouse = new TMath.Vector(undefined, undefined);

        let ctx = TCanvasLib.getDefaultCtx();
        //let factory = TFactories.PosDiameterColorObjectFactory.logisticDiameterFactory(ctx, mouse);
        let factory = new TFactories.CircleFactory(ctx);

        let spacing = 20;
        let a1 = new TMath.Vector(spacing, 0);
        let a2 = new TMath.Vector(spacing / 2, Math.sqrt(spacing * spacing - (spacing / 2) * (spacing / 2)));
        function draw(mouse) {
            TPlotters.FillCtx(ctx, factory, a1, a2);
            //factory.create(mouse);
        }

        draw(new TMath.Vector(30,30));

        //window.addEventListener('mousemove',
        //    function (event) {
        //        let canvas = ctx.canvas;
        //        mouse.x = event.x;
        //        mouse.y = event.y;
        //        mouse.x = mouse.x - canvas.offsetLeft;
        //        mouse.y = mouse.y - canvas.offsetTop;

        //        //TODO redraw
        //        ctx.clearRect(0, 0, canvas.width, canvas.height)
        //        draw(mouse);
        //    });

    }
}