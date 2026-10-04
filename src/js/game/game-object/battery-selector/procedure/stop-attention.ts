import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 注目アニメーションを停止する
 * @param props プロパティ
 */
export function stopAttention(props: Readonly<BatterySelectorProps>): void {
  props.attentionTween.update();
  props.attentionTween.removeAll();
}
