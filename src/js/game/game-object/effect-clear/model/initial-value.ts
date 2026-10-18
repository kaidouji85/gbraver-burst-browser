import { EffectClearModel } from "./effect-clear-model";

/**
 * モデルの初期値を生成する
 * @returns 初期値
 */
export const createInitialValue = (): EffectClearModel => ({
  opacity: 0,
  scale: 1,
});
