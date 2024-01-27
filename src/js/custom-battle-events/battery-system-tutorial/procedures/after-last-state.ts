import type { GameEnd, GameStateX } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { extractGameEnd } from "../../game-state-extractor";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { BatterySystemTutorialProps } from "../props";
import type { BatterySystemTutorialState } from "../state";
import { lose } from "../stories/lose";
import { tutorialEnd } from "../stories/tutorial-end";
import { victory } from "../stories/victory";

/**
 * 最終ステート完了後イベント
 *
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState> {
  const extractedGameEnd = extractGameEnd(props.update);

  if (!extractedGameEnd) {
    return props.state;
  }

  const gameEnd: GameStateX<GameEnd> = extractedGameEnd;
  const result = gameEnd.effect.result;
  const isVictory =
    result.type === "GameOver" && result.winner === props.playerId;
  isVictory ? await victory(props) : await lose(props);
  await refreshConversation(props);
  await tutorialEnd(props);
  invisibleAllMessageWindows(props);
  return props.state;
}
