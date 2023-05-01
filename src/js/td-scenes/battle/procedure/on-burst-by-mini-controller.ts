import { BurstCommand } from "gbraver-burst-core";
import { BattleSceneProps } from "../battle-scene-props";
import { doBurstEventOrNot } from "./do-burst-event-or-not";
import { decideMiniController } from "../animation/decide-mini-controller";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでバーストボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onBurstByMiniController(
  props: Readonly<BattleSceneProps>,
) {
  const burstCommand: BurstCommand = {
    type: "BURST_COMMAND",
  };
  const { isCommandCanceled } = await doBurstEventOrNot(props, burstCommand);
  if (isCommandCanceled) {
    return;
  }

  await decideMiniController(props.view);
  await progressGame(props, burstCommand);
}