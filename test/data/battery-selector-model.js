// @flow

import type {BatterySelectorModel} from "../../src/js/game-object/battery-selector/model";

export const EMPTY_BATTERY_SELECTOR: BatterySelectorModel = {
  battery: 0,
  enableMaxBattery: 0,
  needle: 0,
  label: 'Attack',
  opacity: 1,
  scale: 1,
  minusButtonScale: 1,
  disabled: false,
};