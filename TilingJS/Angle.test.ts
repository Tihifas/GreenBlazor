//const Tiling = require('./Tiling.js')
import { Angle } from './Angle';

test('fromRadiansFromXPosTest', () => {
    expect(TMath.Angle.fromRadiansFromXPos(0).angle).toBe(0);
});