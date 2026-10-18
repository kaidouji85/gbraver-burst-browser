import type { IlluminationModel } from "./illumination-model";

/**
 * ステージ全体照明モデルの初期値を生成する
 *
 * @returns 生成した初期値
 */
export function createInitialValue(): IlluminationModel {
  return {
    intensity: 1,
    color: {
      r: 1,
      g: 1,
      b: 1,
    },
  };
}
