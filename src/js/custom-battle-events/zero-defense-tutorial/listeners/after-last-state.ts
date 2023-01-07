import type { BatteryDeclaration, GameEnd, GameOver, GameStateX } from "gbraver-burst-core";
import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { extractBatteryDeclaration, extractGameEnd } from "../../game-state-extractor";
import { refreshConversation } from "../../invisible-all-message-windows";
import type { ZeroDefenseTutorialState } from "../state";
import { gameEndThanks } from "../stories/game-end-thanks";
import { playerLose } from "../stories/player-lose";
import { zeroDefenseWin } from "../stories/zero-defense-win";

/**
 * 最終ステート完了後イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function afterLastState(props: Readonly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  const extractedBatteryDeclaration = extractBatteryDeclaration(props.update);
  const extractedGameEnd = extractGameEnd(props.update);

  if (!extractedBatteryDeclaration || !extractedGameEnd) {
    return state;
  }

  const batteryDeclaration: GameStateX<BatteryDeclaration> = extractedBatteryDeclaration;
  const gameEnd: GameStateX<GameEnd> = extractedGameEnd;

  if (gameEnd.effect.result.type !== "GameOver") {
    return state;
  }

  const gameOver: GameOver = gameEnd.effect.result;
  const defenderBattery = batteryDeclaration.effect.defenderBattery;
  const isPlayerWin = gameOver.winner === props.playerId;
  const isPlayerAttack = batteryDeclaration.effect.attacker === props.playerId;

  if (defenderBattery === 0 && isPlayerWin && isPlayerAttack) {
    await zeroDefenseWin(props);
    await refreshConversation(props);
    await gameEndThanks(props);
    return state;
  }

  if (!isPlayerWin) {
    await playerLose(props);
    await refreshConversation(props);
    await gameEndThanks(props);
    return state;
  }

  return state;
}