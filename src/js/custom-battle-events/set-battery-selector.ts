import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { waitTime } from "../wait/wait-time";

/**
 * バッテリーセレクタに値を設定する
 * @param props カスタムイベントプロパティ
 * @param toBattery 設定値
 * @param duration ボタンを押す間隔(ミリ秒)
 * @return 処理が完了したら発火するPromise
 */
export async function setBatterySelector(
  props: Readonly<CustomBattleEventProps>,
  toBattery: number,
  duration = 200,
): Promise<void> {
  const currentBattery =
    props.view.hud.gameObjects.batterySelector.getBattery();
  const diff = currentBattery - toBattery;
  const count = Math.abs(diff);
  const pushButton =
    0 < diff
      ? props.view.hud.gameObjects.batterySelector.batteryPlus
      : props.view.hud.gameObjects.batterySelector.batteryMinus;
  for (let i = 0; i < count; i++) {
    pushButton();
    await waitTime(duration);
  }
}
