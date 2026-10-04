import type { SkyBrightnessModel } from "./sky-brightness-model";

/**
 * 空の明るさモデルを初期値を生成する
 *
 * @returns 生成した初期値
 */
export function createInitialValue(): SkyBrightnessModel {
  return {
    brightness: 1,
  };
}
