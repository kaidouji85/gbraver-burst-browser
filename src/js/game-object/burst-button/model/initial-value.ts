import type { BurstButtonModel } from "./burst-button-model";
export function createInitialValue(): BurstButtonModel {
  return {
    opacity: 0,
    isPushNotifierDisabled: true,
    scale: 1,
    canBurst: false,
  };
}
