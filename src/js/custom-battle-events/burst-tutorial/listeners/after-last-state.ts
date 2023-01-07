import type { GameEnd, GameOver } from "gbraver-burst-core";
import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import type { BurstTutorialState } from "../state";
import { playerLose } from "../stories/player-lose";
import { playerWin } from "../stories/player-win";

/**
 * 最終ステート完了後イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function afterLastState(props: Readonly<LastState>, state: BurstTutorialState): Promise<BurstTutorialState> {
  const foundGameEnd = props.update.find(v => v.effect.name === "GameEnd");

  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return state;
  }

  const gameEnd: GameEnd = foundGameEnd.effect;

  if (gameEnd.result.type !== "GameOver") {
    return state;
  }

  const gameOver: GameOver = gameEnd.result;
  const isPayerWin = gameOver.winner === props.playerId;
  isPayerWin ? await playerWin(props) : await playerLose(props);
  return state;
}