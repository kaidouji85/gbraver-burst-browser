import { BatteryCommand } from "gbraver-burst-core";

import { DecideBattery } from "../../actions/decide-battery";
import { decisionByBatterySelector } from "../../animation/decision-by-battery-selector";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { doBatteryEventIfNeeded } from "../do-battery-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * バッテリー決定時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action バッテリー決定アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onDecideBattery(
  props: Readonly<BattleSceneProps>,
  action: DecideBattery,
): void {
  props.exclusive.execute(async (): Promise<void> => {
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

    const playAnimation = createAnimationPlay(props);
    await playAnimation(decisionByBatterySelector(props.view));
    await progressGame(props, batteryCommand);
  });
}
