import type { IneffectiveModel } from "./ineffective-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): IneffectiveModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
