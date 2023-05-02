import { BatteryCommand } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { delay } from "../../../animation/delay";
import type { DecideBattery } from "../actions/decide-battery";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";
import { doBatteryEventOrNot } from "./do-battery-event-or-not";
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
  action: DecideBattery
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.stopPropagation();
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

    await animationPlayer(props).play(
      all(
        props.view.hud.gameObjects.batterySelector.decide(),
        props.view.hud.gameObjects.burstButton.close(),
        props.view.hud.gameObjects.pilotButton.close(),
        props.view.hud.gameObjects.timeScaleButton.close()
      )
        .chain(delay(500))
        .chain(props.view.hud.gameObjects.batterySelector.close())
    );
    await progressGame(props, batteryCommand);
  });
}
