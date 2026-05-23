import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { updatePredicatedDamage } from "../td-scenes/battle/procedure/update-predicated-damage";

/**
 * バッテリーセレクターを+1するアニメーション
 * @param props カスタムバトルイベントプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorPlus = (
  props: CustomBattleEventProps,
): Promise<void> => {
  const nextPlayerBattery =
    props.view.hud.gameObjects.batterySelector.getBattery() + 1;
  updatePredicatedDamage(props, nextPlayerBattery);
  return props.view.hud.gameObjects.batterySelector.batteryPlus();
};

/**
 * バッテリーセレクターを-1するアニメーション
 * @param props カスタムバトルイベントプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorMinus = (
  props: CustomBattleEventProps,
): Promise<void> => {
  const nextPlayerBattery =
    props.view.hud.gameObjects.batterySelector.getBattery() - 1;
  updatePredicatedDamage(props, nextPlayerBattery);
  return props.view.hud.gameObjects.batterySelector.batteryMinus();
};

/**
 * バッテリーセレクターを指定した値に設定するアニメーション
 * @param props カスタムバトルイベントプロパティ
 * @param value 設定するバッテリーの値
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorToBattery = (
  props: CustomBattleEventProps,
  value: number,
): Promise<void> => {
  updatePredicatedDamage(props, value);
  return props.view.hud.gameObjects.batterySelector.toBattery(value);
};

/**
 * バッテリーセレクターのバッテリー調整ボタンを無音で押すアニメーション
 * @param props カスタムバトルイベントプロパティ
 * @param value 設定するバッテリーの値
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorPushBatteryAdjustButtonsSilently = (
  props: CustomBattleEventProps,
  value: number,
): Promise<void> => {
  updatePredicatedDamage(props, value);
  return props.view.hud.gameObjects.batterySelector.pushBatteryAdjustButtonsSilently(
    value,
  );
};
