function circleFactoryDemo() {
    let ctx = TCanvasLib.getDefaultCtx();
    ctx.translate(25,25);
    let factory = new TFactories.CircleFactory(ctx);

    //naming convention as Solid State physics s. 10
    let a1 = new TMath.Vector(100, 0);
    let a2 = new TMath.Vector(50, 200);
    let mMin = 0, mMax = 8;
    let nMin = 0, nMax = 8;
    for (var m = mMin; m < mMax; m++) {
        for (var n = nMin; n < nMax; n++) {
            let pos: TMath.Vector = TMath.Vector.add(a1.scale(m), a2.scale(n));
            factory.create(pos);
        }
    }
}