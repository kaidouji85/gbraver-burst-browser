import type { PilotButtonModel } from "./pilot-button-model";

/**
 * パイロットボタン モデル 初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): PilotButtonModel {
  return {
    opacity: 0,
    shouldPushNotifierStop: true,
    disabled: false,
    scale: 1,
    canActivatePilotSkill: true,
  };
}
