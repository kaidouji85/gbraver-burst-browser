// @flow

import type {DepricatedBatterySelectorModel} from "./battery-selector";

export function createInitialValue(maxBattery: number): DepricatedBatterySelectorModel {
  return {
    slider: {
      battery: 0,
      max: maxBattery,
      enableMax: maxBattery
    },
    okButton: {
      depth: 0,
      label: 'Attack'
    },
    disabled: true,
    opacity: 0
  };
}