import { Update } from "../../../game-loop/update";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * Update時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onUpdate(
  props: Readonly<BatterySelectorProps>,
  action: Update,
): void {
  const {
    batteryMinusTween,
    batteryPlusTween,
    batteryChangeTween,
    attentionTween,
  } = props;
  batteryMinusTween.update(action.time);
  batteryPlusTween.update(action.time);
  batteryChangeTween.update(action.time);
  attentionTween.update(action.time);
}
