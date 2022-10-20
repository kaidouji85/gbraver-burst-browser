// @flow
import type { ConfigProps } from "../props";

/**
 * 本シーンの入力要素が操作可能であるか否かの設定をするヘルパー関数
 *
 * @param props 画面プロパティ
 * @param isDisabled trueで操作可能である
 */
export function isInputDisabled(props: ConfigProps, isDisabled: boolean): void {
  props.webGLPixelRatioSelector.disabled = isDisabled;
  props.battleAnimationTimeScaleSelector.disabled = isDisabled;
  props.bgmVolumeSelector.disabled = isDisabled;
  props.seVolumeSelector.disabled = isDisabled;
}
