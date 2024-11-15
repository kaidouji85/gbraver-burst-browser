import { BatteryCommand } from "gbraver-burst-core";

import { DecideBatteryByMiniController } from "../../actions/decide-battery-by-mini-controller";
import { decisionByBatterySelector } from "../../animation/decision-by-battery-selector";
import { decisionByMiniController } from "../../animation/decision-by-mini-controller";
import { BattleSceneProps } from "../../props";
import { doBatteryEventIfNeeded } from "../do-battery-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * ミニコントローラーでバッテリーボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onDecideBatteryByMiniController(
  props: Readonly<BattleSceneProps>,
  action: Readonly<DecideBatteryByMiniController>,
): void {
  props.exclusive.execute(async () => {
    const batteryCommand: BatteryCommand = {
      type: "BATTERY_COMMAND",
      battery: action.battery,
    };
    const { isCommandCanceled } = await doBatteryEventIfNeeded(
      props,
      batteryCommand,
    );
    if (isCommandCanceled) {
      return;
    }

    // display: noneでもミニコントローラのaccesskeyは有効なので、
    // コントローラーが「おおきいボタン」の場合でも、本関数は呼ばれうる
    const decisionAnimation =
      props.controllerType === "BigButton"
        ? decisionByBatterySelector(props.view)
        : decisionByMiniController(props.view);
    await props.animatePlayer.play(decisionAnimation);
    await progressGame(props, batteryCommand);
  });
}
