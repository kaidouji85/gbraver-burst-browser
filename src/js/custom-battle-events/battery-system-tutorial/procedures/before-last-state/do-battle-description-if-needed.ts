import { Battle } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../../wait/wait-time";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { turnCount } from "../../../turn-count";
import { BatterySystemTutorialProps } from "../../props";
import { BatterySystemTutorialState } from "../../state";
import { batteryRuleDescription } from "../../stories/battery-rule-description";
import { completeAttackAndDefense } from "../../stories/complete-attack-and-defense";
import { enemyAttack } from "../../stories/enemy-attack";
import { playerAttack } from "../../stories/player-attack";

/**
 * 条件を満たした場合にバトルの説明をする
 * @param props イベントプロパティ
 * @returns 説明をした場合はステート更新結果、そうでない場合はnull
 */
export async function doBattleDescriptionIfNeeded(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState | null> {
  const hasGameEnd = props.update.some(
    (state) => state.effect.name === "GameEnd",
  );
  if (hasGameEnd) {
    return null;
  }

  const foundBattle = props.update.find(
    (state) => state.effect.name === "Battle",
  );
  if (!foundBattle) {
    return null;
  }

  if (foundBattle.effect.name !== "Battle") {
    return null;
  }

  const battle: Battle = foundBattle.effect;
  const turn = turnCount(props.stateHistory);
  const isPlayerAttack = battle.attacker === props.playerId;
  if (isPlayerAttack) {
    await playerAttack(props, battle.result);
  } else {
    await enemyAttack(props, battle.result);
  }
  invisibleAllMessageWindows(props);
  if (turn === 2) {
    await waitTime(200);
    await batteryRuleDescription(props);
    return props.eventState;
  } else if (turn === 3) {
    await waitTime(200);
    await completeAttackAndDefense(props);
    invisibleAllMessageWindows(props);
    return {
      ...props.eventState,
      isBatterySystemDescriptionComplete: true,
    };
  } else {
    return props.eventState;
  }
}
