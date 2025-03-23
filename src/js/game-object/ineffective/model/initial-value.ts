import { IneffectiveModel } from "./ineffective-model";

/**
 * モデルの初期値を生成する
 * @returns 初期値
 */
export const createInitialValue = (): IneffectiveModel => ({
  opacity: 0,
  scale: 1,
});
