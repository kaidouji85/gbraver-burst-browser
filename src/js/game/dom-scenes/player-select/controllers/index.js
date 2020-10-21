// @flow

import {ControlButton} from "./control-button";

/**
 * OKボタンを生成する
 *
 * @param label ラベル名
 * @return 生成結果
 */
export function okButton(label: string): ControlButton {
  return new ControlButton(label, 'player-select__ok-button');
}

/**
 * 戻るボタンを生成する
 *
 * @return 生成結果
 */
export function prevButton(): ControlButton {
  return new ControlButton('戻る', 'player-select__prev-button');
}