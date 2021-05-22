namespace TMath {
    export class Angle {
        angle: number; //radiansFromXPos

        //For example FromX is from x-axis.
        //Pos: positiv omløbsretning / anticlockvise, Neg: negativ omløbsretning / clockwise
        get radiansFromXPos(): number { return this.angle; }
        get degreesFromXPos(): number { return Angle.radiansToDegrees(this.angle); }

        get radiansFromXNeg(): number { return -this.angle; }
        get degreesFromXNeg(): number { return -Angle.radiansToDegrees(this.angle); }

        get radiansFromYNeg(): number { return -this.angle + Math.PI/2; }
        get degreesFromYNeg(): number { return Angle.radiansToDegrees(this.radiansFromYNeg); }

        get inPIs(): number { return this.angle / Math.PI; }

        constructor(radiansFromXPos: number) {
            this.angle = radiansFromXPos;
        }

        public copy(): Angle {
            return new Angle(this.angle);
        }

        public cos(): number {
            return Math.cos(this.angle);
        }

        public sin(): number {
            return Math.sin(this.angle);
        }

        public scale(a: number): Angle {
            this.angle = this.angle * a;
            return this;
        }

        public add(otherAngle: Angle): Angle {
            this.angle += otherAngle.angle;
            return this;
        }

        public static add(angle1: Angle, angle2: Angle): Angle {
            return new Angle(angle1.angle + angle2.angle);
        }

        public static fromRadiansFromXPos(radiansFromXPos: number) {
            return new Angle(radiansFromXPos);
        }

        public static fromRadiansFromXNeg(radiansFromXNeg: number) {
            return new Angle(-radiansFromXNeg);
        }

        public static fromRadiansFromYNeg(radiansFromYNeg: number) {
            let radiansFromXPos = -radiansFromYNeg + Math.PI / 2;
            return new Angle(radiansFromXPos);
        }

        public static fromDegreesFromXPos(degreesFromXPos: number) {
            return new Angle(Angle.degreesToRadians(degreesFromXPos));
        }

        public static fromDegreesFromXNeg(degreesFromXNeg: number) {
            return new Angle(-Angle.degreesToRadians(degreesFromXNeg));
        }

        public static fromDegreesFromYNeg(degreesFromYNeg: number) {
            let radiansFromXPos = -Angle.radiansToDegrees(degreesFromYNeg) + Math.PI / 2;
            return new Angle(radiansFromXPos);
        }


        public static radiansToDegrees(radians: number): number {
            return radians / (2 * Math.PI) * 360;;
        }

        public static degreesToRadians(degrees: number): number {
            return degrees / (360) * 2 * Math.PI;
        }
    }
}