namespace TCanvasLib {
    export interface CanvasOperation {
        pos: TMath.Vector;
        applyToCanvas(HTMLCanvasElement): void;
    }

    export class MovableCanvasOperationWrapper {
        public canvasObject: CanvasOperation;
        public canvasManager: CanvasManager;

        get canvas(): HTMLCanvasElement { return this.canvasManager.canvas; }
        get ctx(): RenderingContext { return this.canvas.getContext('2d'); }
        public handleElement: JQuery<HTMLElement>;

        constructor(canvasObject: CanvasOperation, canvasManager: CanvasManager) {
            this.canvasManager = canvasManager;
            this.canvasObject = canvasObject
            let left = this.canvasManager.canvas.offsetLeft + canvasObject.pos.x;
            let top = this.canvasManager.canvas.offsetTop + canvasObject.pos.y;
            this.handleElement = $(canvasManager.htmlContainerElmnt).add("div")
                .css("position", "absolute")
                .css("left", left)
                .css("top", top)
                .css("width", 50)
                .css("height", 50)
                .css("background-color", "blue");
            this.handleElement.draggable({
                drag: function (event, ui) {
                    let handleElement = event.target as HTMLElement;
                    let newPos = new TMath.Vector(Number(handleElement.style.left), Number(handleElement.style.top));
                    this.pos = newPos;
                    canvasManager.Update();
                }
            });
            canvasObject.applyToCanvas(this.canvas);
            //todo: draw
        }

        public applyToCanvas() {
            this.canvasObject.applyToCanvas(this.canvas);
        }

        //public draw() = () => //default
        //canvasObject.
        //}

    }

    //THis way is only good for updating everything. Can certain object be updated one at a time?
    export class CanvasManager {
        public canvas: HTMLCanvasElement;
        get ctx(): RenderingContext { return this.canvas.getContext('2d'); }
        public htmlContainerElmnt: HTMLElement;
        public canvasObjectWrapperArray: MovableCanvasOperationWrapper[] = [];

        constructor(canvas: HTMLCanvasElement, htmlContainerElmnt: HTMLElement = null) {
            this.canvas = canvas;
            if (htmlContainerElmnt == null) {
                let containerElmnt = document.createElement('div');
                document.getElementsByTagName('body')[0].appendChild(containerElmnt);
                this.htmlContainerElmnt = containerElmnt;
            }
            else {
            this.htmlContainerElmnt = htmlContainerElmnt;
            }
        }

        public AddCanvasOperation(canvasOperation: CanvasOperation) {
            let canvasObject = new MovableCanvasOperationWrapper(canvasOperation, this);
            //TODO: here? canvasObject.applyToCanvas
            this.canvasObjectWrapperArray.push(canvasObject);
        }

        public Update() {
            //TODO keep clear?
            (this.ctx as CanvasRenderingContext2D).clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvasObjectWrapperArray.forEach(function (wrapper) {
                wrapper.applyToCanvas();
            });
        }
    }
}