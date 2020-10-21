// @flow

import {ControlButton} from "./control-button";

/**
 * OKボタンを生成する
 * 
 * @param label ラベル名
 * @return 生成結果
 */
export function okButton(label: string): ControlButton {
  return new ControlButton(label);
}