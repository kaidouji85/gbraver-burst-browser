// @flow

import {BatteryGaugeState} from '../base';
import type {BatteryGaugeModel} from '../base';


/**
 *
 */
export class ChangeImmediately implements BatteryGaugeState {
  gameLoop(model: BatteryGaugeModel): BatteryGaugeModel {
    // NOP
    return model;
  }
}
