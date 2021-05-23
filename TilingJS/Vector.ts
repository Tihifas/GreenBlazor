namespace TMath {
    export class Vector {
        public x: number;
        public y: number;

        //static N: Vector = new Vector(0, -1);
        //static NE: Vector = new Vector(Math.sqrt(2), -Math.sqrt(2));
        //static SE: Vector = new Vector(Math.sqrt(2), Math.sqrt(2));
        //static S: Vector = new Vector(0, 2);
        //static SW: Vector = new Vector(-1, 1);
        //static NW: Vector = new Vector(-1, -1);

        public constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        //From x-axis
        public static fromPolar(a: number, angle: Angle): Vector {
            return new Vector(a * angle.cos(), a * angle.sin());
        }

        public copy(): Vector {
            return new Vector(this.x, this.y);
        }

        public yNegCopy(): Vector {
            return new Vector(this.x, -this.y);
        }

        public static fromRotationAndLength(rotation: number, lenght = 1) {
            let x = Math.cos(rotation) * lenght;
            let y = Math.sin(rotation) * lenght;
            return new Vector(x, y)
        }

        public norm() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        public polarAngle() {
            return Math.atan2(this.y, this.x);
        }

        public static add(v1: Vector, v2: Vector) {
            return new Vector(v1.x + v2.x, v1.y + v2.y);
        }

        public add(vOther: Vector) {
            this.x += vOther.x;
            this.y += vOther.y;
        }

        public copyAddXY(dx: number, dy: number) {
            return new Vector(this.x+dx, this.y+dy);
        }

        public static subtract(v1: Vector, v2: Vector) {
            return new Vector(v1.x - v2.x, v1.y - v2.y);
        }

        public substract(vOther: Vector) {
            this.x -= vOther.x;
            this.y -= vOther.y;
        }

        public scale(a: number) {
            return new Vector(this.x * a, this.y * a);
        }

        public equals(vOther: Vector) {
            if (this.x === vOther.x && this.y === vOther.y) {
                return true;
            } else {
                return false;
            }
        }
    }
}