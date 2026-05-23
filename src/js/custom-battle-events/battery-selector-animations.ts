import { SilentlyBatteryAdjustOptions } from "../game-object/battery-selector/procedure/push-battery-adjust-buttons-silently";
import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { updatePredicatedDamage } from "../td-scenes/battle/procedure/update-predicated-damage";

/**
 * バッテリーセレクターを+1するアニメーション
 * バッテリーセレクター変更に応じて関連するオブジェクトの更新も行う
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
 * バッテリーセレクター変更に応じて関連するオブジェクトの更新も行う
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
 * バッテリーセレクターのバッテリー調整ボタンを無音で押すアニメーション
 * バッテリーセレクター変更に応じて関連するオブジェクトの更新も行う
 * @param props カスタムバトルイベントプロパティ
 * @param value 設定するバッテリーの値
 * @param options オプション
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorPushBatteryAdjustButtonsSilently = (
  props: CustomBattleEventProps,
  value: number,
  options?: SilentlyBatteryAdjustOptions,
): Promise<void> => {
  updatePredicatedDamage(props, value);
  return props.view.hud.gameObjects.batterySelector.pushBatteryAdjustButtonsSilently(
    value,
    options,
  );
};
