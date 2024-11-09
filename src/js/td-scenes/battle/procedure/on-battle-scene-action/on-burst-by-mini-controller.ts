import { BurstCommand } from "gbraver-burst-core";

import { decisionByBurstButton } from "../../animation/decision-by-burst-button";
import { decisionByMiniController } from "../../animation/decision-by-mini-controller";
import { BattleSceneProps } from "../../props";
import { doBurstEventIfNeeded } from "../do-burst-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * ミニコントローラーでバーストボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onBurstByMiniController(
  props: Readonly<BattleSceneProps>,
): void {
  props.exclusive.execute(async () => {
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

    // display: noneでもミニコントローラのaccesskeyは有効なので、
    // コントローラーが「おおきいボタン」の場合でも、本関数は呼ばれうる
    const decisionAnimation =
      props.controllerType === "BigButton"
        ? decisionByBurstButton(props.view)
        : decisionByMiniController(props.view);
    await props.animatePlayer.play(decisionAnimation);
    await progressGame(props, burstCommand);
  });
}
