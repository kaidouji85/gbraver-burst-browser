// @flow
import type {Battle, GameState, GameStateX} from "gbraver-burst-core";
import type {LastState} from "../../../game/td-scenes/battle/custom-battle-event";
import {extractBattle, extractGameEnd} from "../../game-state-extractor";
import type {ZeroDefenseTutorialState} from "../state";
import {damageRace} from "../stories/damage-race";
import {introduction} from "../stories/introduction";
import {zeroBatteryChance} from "../stories/zero-battery-chance";

/**
 * 最終ステート直前イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function beforeLastState(props: $ReadOnly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  const updatedStateHistory = {...state, stateHistory: [...state.stateHistory, ...props.update]};
  if (!state.isIntroductionComplete) {
    await introduction(props);
    return {...updatedStateHistory, isIntroductionComplete: true};
  }

  const extractedGameEnd = extractGameEnd(props.update);
  const extractedBattle = extractBattle(props.update);
  if (extractedBattle && !extractedGameEnd) {
    const battle: GameStateX<Battle> = extractedBattle;
    const player = battle.players.find(v => v.playerId === props.playerId);
    const enemy = battle.players.find(v => v.playerId !== props.playerId);
    if (player && enemy) {
      const isEnemyAttack = battle.effect.attacker !== props.playerId;
      if (isEnemyAttack) {
        await damageRace(props, player.armdozer.hp, enemy.armdozer.hp);
        return {...updatedStateHistory, isDamageRaceComplete: true};
      }
    }
  }

  const foundLastState = props.update[props.update.length - 1];
  if (foundLastState) {
    const lastState: GameState = foundLastState;
    const isPlayerTurn = lastState.activePlayerId === props.playerId;
    const enemy = lastState.players.find(v => v.playerId !== props.playerId);
    if (enemy && isPlayerTurn && (enemy.armdozer.battery === 0) && (0 < enemy.armdozer.hp)) {
      await zeroBatteryChance(props);
    }
  }

  return updatedStateHistory;
}