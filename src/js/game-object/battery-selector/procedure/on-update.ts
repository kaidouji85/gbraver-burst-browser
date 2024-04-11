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
  props.batteryMinusTween.update(action.time);
  props.batteryPlusTween.update(action.time);
  props.batteryChangeTween.update(action.time);
}
