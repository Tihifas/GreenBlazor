namespace TCanvasLib {
    export class CANVASOBJECTWRAPPER {
        public canvasManager: CanvasManager;
        get canvas(): HTMLCanvasElement { return this.canvasManager.canvas; }
        get ctx(): RenderingContext { return this.canvas.getContext('2D'); }
        public handleElement: HTMLElement

        //constructor(canvasObject){
        //canvasObject.
    //}

        // prop Delegate triggerUpdate
        // prop Delegate redraw
    }

    //THis way is only good for updating everything. Can certain object be updated one at a time?
    export class CanvasManager {
        public canvas: HTMLCanvasElement;
        get ctx(): RenderingContext { return this.canvas.getContext('2D'); }
        public CANVASOBJECTWRAPPERs: CANVASOBJECTWRAPPER[];

        constructor(canvas: HTMLCanvasElement) {

        }

        //public addCANVASOBJECTWRAPPERs(canvasObject, delegate1, delegate2 = default){

    }

        //function Update{
        //for each in CANVASOBJECTWRAPPER
        //draw
    //}
    //}
}