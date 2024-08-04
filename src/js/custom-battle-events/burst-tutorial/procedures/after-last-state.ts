import type { GameEnd, GameOver } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { BurstTutorialProps } from "../props";
import type { BurstTutorialState } from "../state";
import { playerLose } from "../stories/player-lose";
import { playerWin } from "../stories/player-win";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState & BurstTutorialProps>,
): Promise<BurstTutorialState> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");

  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return props.eventState;
  }

  const gameEnd: GameEnd = foundGameEnd.effect;

  if (gameEnd.result.type !== "GameOver") {
    return props.eventState;
  }

  const gameOver: GameOver = gameEnd.result;
  const isPayerWin = gameOver.winner === props.playerId;
  if (isPayerWin) {
    await playerWin(props);
  } else {
    await playerLose(props);
  }
  return props.eventState;
}
