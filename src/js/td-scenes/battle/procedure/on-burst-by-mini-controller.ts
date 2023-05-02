import { BurstCommand } from "gbraver-burst-core";

import { decideMiniController } from "../animation/decide-mini-controller";
import { BattleSceneProps } from "../battle-scene-props";
import { doBurstEventOrNot } from "./do-burst-event-or-not";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでバーストボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export function onBurstByMiniController(
  props: Readonly<BattleSceneProps>
): void {
  props.exclusive.execute(async () => {
    const burstCommand: BurstCommand = {
      type: "BURST_COMMAND",
    };
    const { isCommandCanceled } = await doBurstEventOrNot(props, burstCommand);
    if (isCommandCanceled) {
      return;
    }
  
    await decideMiniController(props.view).play();
    await progressGame(props, burstCommand);
  });
}
