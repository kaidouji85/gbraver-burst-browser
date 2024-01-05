import type { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../../wait/wait-time";
import { extractBattle, extractGameEnd } from "../../../game-state-extractor";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { turnCount } from "../../../turn-count";
import { BatterySystemTutorialProps } from "../../props";
import type { BatterySystemTutorialState } from "../../state";
import { batteryRuleDescription } from "../../stories/battery-rule-description";
import { completeAttackAndDefense } from "../../stories/complete-attack-and-defense";
import { enemyAttack } from "../../stories/enemy-attack";
import { introduction } from "../../stories/introduction";
import { playerAttack } from "../../stories/player-attack";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState> {
  const extractedGameEnd = extractGameEnd(props.update);
  if (extractedGameEnd) {
    return props.state;
  }

  const turn = turnCount(props.stateHistory);
  if (turn === 1) {
    await introduction(props);
    return props.state;
  }

  const extractedBattle = extractBattle(props.update);
  if (extractedBattle) {
    const battle = extractedBattle.effect;
    const isPlayerAttack = battle.attacker === props.playerId;
    isPlayerAttack
      ? await playerAttack(props, battle.result)
      : await enemyAttack(props, battle.result);
    invisibleAllMessageWindows(props);
  }

  if (turn === 2 && extractedBattle) {
    await waitTime(200);
    await batteryRuleDescription(props);
    return props.state;
  }

  if (turn === 3 && extractedBattle) {
    await waitTime(200);
    await completeAttackAndDefense(props);
    invisibleAllMessageWindows(props);
    return {
      ...props.state,
      isBatterySystemDescriptionComplete: true,
    };
  }

  return props.state;
}
