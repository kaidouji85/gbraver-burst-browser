// @flow

import type {BatterySelectorModel} from "./battery-selector";

export function createInitialValue(maxBattery: number): BatterySelectorModel {
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
    disabled: false,
    opacity: 1
  };
}