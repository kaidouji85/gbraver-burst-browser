import type { DamageHalvedModel } from "./damage-halved-model";

/**
 * モデルの初期値を生成する
 *
 * @returns 初期値
 */
export function createInitialValue(): DamageHalvedModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
