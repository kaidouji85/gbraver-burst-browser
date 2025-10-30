import { BatteryNumberPushed } from "../../actions/battery-number-pushed";
import type { BattleSceneProps } from "../../props";

/**
 * バッテリーセレクタの数字が押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション情報
 */
export const onBatteryNumberPushed = (
  props: BattleSceneProps,
  action: BatteryNumberPushed,
): void => {
  props.exclusive.execute(async () => {
    props.view.hud.gameObjects.batterySelector.toBattery(action.value);
  });
};
