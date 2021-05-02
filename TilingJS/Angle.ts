namespace TMath {
    export class Angle {
        angle: number; //radiansFromXPos

        //For example FromX is from x-axis.
        //Pos: positiv omløbsretning / anticlockvise, Neg: negativ omløbsretning / clockwise
        get radiansFromXPos(): number { return this.angle; }
        get degreesFromXPos(): number { return Angle.radiansToDegrees(this.angle); }

        get radiansFromYNeg(): number { return -this.angle + Math.PI/2; }
        get degreesFromYNeg(): number { return Angle.radiansToDegrees(this.radiansFromYNeg); }

        constructor(radiansFromXPos: number) {
            this.angle = radiansFromXPos;
        }

        public static fromRadiansFromYNeg(radiansFromYNeg: number) {
            let radiansFromXPos = -radiansFromYNeg + Math.PI / 2;
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