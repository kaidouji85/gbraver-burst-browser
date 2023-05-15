import { BurstCommand } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { delay } from "../../../animation/delay";
import type { DoBurst } from "../actions/do-burst";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";
import { doBurstEventOrNot } from "./do-burst-event-or-not";
import { progressGame } from "./progress-game";

/**
 * バースト時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action バースト発動アクション
 * @return 処理が完了したら発火するPromise
 */
export function onBurst(
  props: Readonly<BattleSceneProps>,
  action: DoBurst
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    const burstCommand: BurstCommand = {
      type: "BURST_COMMAND",
    };
    const { isCommandCanceled } = await doBurstEventOrNot(props, burstCommand);
    if (isCommandCanceled) {
      return;
    }

    await animationPlayer(props).play(
      all(
        props.view.hud.gameObjects.burstButton.decide(),
        props.view.hud.gameObjects.batterySelector.close(),
        props.view.hud.gameObjects.pilotButton.close(),
        props.view.hud.gameObjects.timeScaleButton.close()
      )
        .chain(delay(500))
        .chain(props.view.hud.gameObjects.burstButton.close())
    );
    await progressGame(props, burstCommand);
  });
}
