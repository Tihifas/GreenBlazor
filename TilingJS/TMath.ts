namespace TMath {
    export function logisticFunction(x: number, maxValue: number = 1, x0: number = 6, growthRate: number = 1) {
        let result = maxValue / (1 + Math.exp(-growthRate * (x - x0)));
        return result;
    }
}