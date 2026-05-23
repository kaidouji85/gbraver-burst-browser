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
  const signal = props.abort.getAbortController().signal;
  return props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
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
  const signal = props.abort.getAbortController().signal;
  return props.view.hud.gameObjects.batterySelector.batteryMinus({ signal });
};

/**
 * バッテリーセレクターのバッテリー調整ボタンを無音で押すアニメーション
 * バッテリーセレクター変更に応じて関連するオブジェクトの更新も行う
 * @param props カスタムバトルイベントプロパティ
 * @param value 設定するバッテリーの値
 * @param options オプション（signalは自動的に設定されるので設定不可）
 * @returns アニメーションが完了したら発火するPromise
 */
export const batterySelectorPushBatteryAdjustButtonsSilently = (
  props: CustomBattleEventProps,
  value: number,
  options?: Omit<SilentlyBatteryAdjustOptions, "signal">,
): Promise<void> => {
  updatePredicatedDamage(props, value);
  const signal = props.abort.getAbortController().signal;
  return props.view.hud.gameObjects.batterySelector.pushBatteryAdjustButtonsSilently(
    value,
    { ...options, signal },
  );
};
