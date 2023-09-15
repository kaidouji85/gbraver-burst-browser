import { BatteryCommand } from "gbraver-burst-core";

import { DecideBattery } from "../actions/decide-battery";
import { decisionByBatterySelector } from "../animation/decision-by-battery-selector";
import { BattleSceneProps } from "../battle-scene-props";
import { doBatteryEventIfNeeded } from "./do-battery-event-if-needed";
import { progressGame } from "./progress-game";

/**
 * バッテリー決定時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action バッテリー決定アクション
 * @return 処理が完了したら発火するPromise
 */
export function onDecideBattery(
  props: Readonly<BattleSceneProps>,
  action: DecideBattery,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.stopPropagation();
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

    await props.animatePlayer.play(decisionByBatterySelector(props.view));
    await progressGame(props, batteryCommand);
  });
}
