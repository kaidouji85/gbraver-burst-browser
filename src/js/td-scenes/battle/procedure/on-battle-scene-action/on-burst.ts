import { BurstCommand } from "gbraver-burst-core";

import { DoBurst } from "../../actions/do-burst";
import { decisionByBurstButton } from "../../animation/decision-by-burst-button";
import { BattleSceneProps } from "../../props";
import { doBurstEventIfNeeded } from "../do-burst-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * バースト時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action バースト発動アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onBurst(
  props: Readonly<BattleSceneProps>,
  action: DoBurst,
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    const burstCommand: BurstCommand = {
      type: "BURST_COMMAND",
    };
    const { isCommandCanceled } = await doBurstEventIfNeeded(
      props,
      burstCommand,
    );
    if (isCommandCanceled) {
      return;
    }

    await props.animatePlayer.play(decisionByBurstButton(props.view));
    await progressGame(props, burstCommand);
  });
}
