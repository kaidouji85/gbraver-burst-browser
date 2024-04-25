import type { FaderModel } from "./fader-model";

/**
 * モデルの初期値を生成する
 *
 * @param isVisible 表示フラグ、trueで表示する
 * @returns モデルの初期値
 */
export function createInitialValue(isVisible: boolean): FaderModel {
  return {
    opacity: isVisible ? 1 : 0,
    width: 1,
    height: 1,
  };
}
