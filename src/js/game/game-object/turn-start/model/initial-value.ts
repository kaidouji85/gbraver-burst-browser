import type { TurnStartModel } from "./turn-start-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): TurnStartModel {
  return {
    opacity: 0,
    scale: 1,
    position: {
      x: 0,
      y: 0,
    },
  };
}
