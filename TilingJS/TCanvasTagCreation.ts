namespace TCanvasTagCreation {
    export function MakeCanvas(x: number, y: number, width: number, height: number,
                                drawBorder: boolean = false, parentElmnt: HTMLElement = null,
                                fixCanvasDpi: boolean = true): HTMLCanvasElement {
        if (parentElmnt == null) {
            parentElmnt = document.body;
        }

        let canvas = document.createElement("canvas");
        if (fixCanvasDpi) TCanvasLib.fixCanvasDpi(canvas);

        canvas.style.position = "absolute";
        canvas.style.left = x + 'px';
        canvas.style.top= y + 'px';
        canvas.width = width; //important to set canvas.width/height, not just canvas.style.width!
        canvas.height = height;

        parentElmnt.appendChild(canvas); 

        if (drawBorder) canvas.style.border = "1px solid black";
        return canvas;
    }

    export function MakeCanvasColumn(n: number, heightOfOne: number, width: number = null, x: number = 0, y: number = 0, parentElmnt: HTMLElement = null, fixCanvasDpi = true): HTMLCanvasElement[] {
        if (width === null) throw new Error("notimplemented"); //TODO screen/parent width

        let yCurrent: number = y;
        let canvases: HTMLCanvasElement[] = new Array(n);
        for (var i = 0; i < n; i++) {
            let canvas = MakeCanvas(x, yCurrent, width, heightOfOne, false, parentElmnt, fixCanvasDpi);
            yCurrent += heightOfOne;
            canvases[i] = canvas;
        }

        return canvases;
    }
}