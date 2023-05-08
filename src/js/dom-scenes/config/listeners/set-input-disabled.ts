import type { ConfigProps } from "../props";

/**
 * 本シーンの入力要素を全て操作不可能にする
 * @param props 画面プロパティ
 */
export function setInputDisabled(props: ConfigProps): void {
  props.battleAnimationTimeScaleSelector
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = true;
    });
  props.webGLPixelRatioSelector
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = true;
    });
  props.battleControllerTypeSelector
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = true;
    });
  props.bgmVolumeSelector.disabled = true;
  props.seVolumeSelector.disabled = true;
}
