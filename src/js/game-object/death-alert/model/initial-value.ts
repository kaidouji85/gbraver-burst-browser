import type { DeathAlertModel } from "./death-alert-model";

/**
 * モデルの初期値を生成する
 * @returns モデルの初期値
 */
export function createInitialValue(): DeathAlertModel {
  return {
    opacity: 0,
    width: 1,
    height: 1,
    color: { r: 0, g: 0, b: 0 },
  };
}
