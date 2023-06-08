import { BatteryCommand } from "gbraver-burst-core";

import { DecideBatteryByMiniController } from "../actions/decide-battery-by-mini-controller";
import { decideMiniController } from "../animation/decide-mini-controller";
import { BattleSceneProps } from "../battle-scene-props";
import { doBatteryEventIfNeeded } from "./do-battery-event-if-needed";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでバッテリーボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export function onDecideBatteryByMiniController(
  props: Readonly<BattleSceneProps>,
  action: Readonly<DecideBatteryByMiniController>
): void {
  props.exclusive.execute(async () => {
    const batteryCommand: BatteryCommand = {
      type: "BATTERY_COMMAND",
      battery: action.battery,
    };
    const { isCommandCanceled } = await doBatteryEventIfNeeded(
      props,
      batteryCommand
    );
    if (isCommandCanceled) {
      return;
    }

    await decideMiniController(props.view).play();
    await progressGame(props, batteryCommand);
  });
}
