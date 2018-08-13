// @flow

import type {SliderModel} from "./slider";
import type {OkButtonModel} from "./ok-button";

/** バッテリーセレクタのモデル */
export type BatterySelectorModel = {
  /** スライダー */
  slider: SliderModel,
  /** OKボタン */
  okButton: OkButtonModel,
  /** 操作不可能フラグ、trueで操作不可能になる */
  disabled: boolean,
  /** 透明度、0〜1で指定して1で完全不透明 */
  opacity: number,
};