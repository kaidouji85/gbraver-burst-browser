import type { TsubasaModel } from "./tsubasa-model";

/**
 * モデルの初期値を生成する
 *
 * @returns モデルの初期値
 */
export function createInitialValue(): TsubasaModel {
  return {
    opacity: 0,
    scale: 1,
    position: {
      x: 0,
    },
  };
}
