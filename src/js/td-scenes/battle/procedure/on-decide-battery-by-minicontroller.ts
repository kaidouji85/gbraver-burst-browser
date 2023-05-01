import { BatteryCommand } from "gbraver-burst-core";
import { DecideBatteryByMiniController } from "../actions/decide-battery-by-mini-controller";
import { BattleSceneProps } from "../battle-scene-props";
import { doBatteryEventOrNot } from "./do-battery-event-or-not";
import { decideMiniController } from "../animation/decide-mini-controller";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでバッテリーボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onDecideBatteryByMiniController(
  props: Readonly<BattleSceneProps>,
  action: Readonly<DecideBatteryByMiniController>
) {
  const batteryCommand: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: action.battery,
  };
  
  const { isCommandCanceled } = await doBatteryEventOrNot(
    props,
    batteryCommand
  );
  if (isCommandCanceled) {
    return;
  }

  await decideMiniController(props.view);
  await progressGame(props, batteryCommand);
}
