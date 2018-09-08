import type {BatteryNumberModel} from "./battery-number-model";

export function createInitialValue(): BatteryNumberModel {
  return {
    alpha: 0,
    battery: 0
  };
}