import { LightningShotModel } from "./lightning-shot-model";

/**
 * 電撃ショットのモデルの初期値を生成する
 * @returns 電撃ショットのモデルの初期値
 */
export function createModelInitialValue(): LightningShotModel {
  return {
    animation: { frame: 0 },
    opacity: 0,
  };
}
