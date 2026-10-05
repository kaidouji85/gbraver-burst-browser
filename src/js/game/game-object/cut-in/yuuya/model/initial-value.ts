import type { YuuyaModel } from "./yuuya-model";

/**
 * モデルの初期値を生成する
 * @returns モデルの初期値
 */
export function createInitialValue(): YuuyaModel {
  return {
    opacity: 0,
    scale: 1,
    position: {
      x: 0,
    },
  };
}
