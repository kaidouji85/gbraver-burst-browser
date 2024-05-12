import { PredicatedDamageModel } from "./predicated-damage-model";

/**
 * モデルの初期値を生成する
 * @returns 生成結果
 */
export function initialValue(): PredicatedDamageModel {
  return {
    damage: 2000,
    opacity: 0,
  };
}
