import { BurstCommand } from "gbraver-burst-core";

import { DoBurst } from "../../actions/do-burst";
import { decisionByBurstButton } from "../../animation/decision-by-burst-button";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { doBurstEventIfNeeded } from "../do-burst-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * バースト時の処理
 * @param props 戦闘シーンプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export function onBurst(
  props: Readonly<BattleSceneProps>,
  action: Readonly<DoBurst>,
): void {
  props.exclusive.execute(async () => {
    const { event } = action;
    const burstCommand: BurstCommand = {
      type: "BURST_COMMAND",
    };
    const { isCommandCanceled } = await doBurstEventIfNeeded({
      props,
      burst: burstCommand,
      event,
    });
    if (isCommandCanceled) {
      return;
    }

    const playAnimation = createAnimationPlay(props);
    await playAnimation(decisionByBurstButton(props.view));
    await progressGame(props, burstCommand);
  });
}
