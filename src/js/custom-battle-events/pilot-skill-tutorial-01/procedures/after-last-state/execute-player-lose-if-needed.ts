import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { playerLose } from "../../stories/player-lose";

/**
 * 条件を満たした場合「プレイヤー敗北ストーリー」を再生する
 * @param props イベントプロパティ
 * @returns trueでストーリーを再生した
 */
export async function executePlayerLoseIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return false;
  }

  await playerLose(props);
  invisibleAllMessageWindows(props);
  return true;
}
