// @flow
import type {LastState} from "../../../game/td-scenes/battle/custom-battle-event";
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
  state.stateHistory = [...state.stateHistory, ...props.update];
  if (!state.isIntroductionComplete) {
    await introduction(props);
    return {...state, isIntroductionComplete: true};
  }

  const isGameEnd = props.update.filter(v => v.effect.name === 'GameEnd').length > 0;
  const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
  const battlePlayer = (foundLastBattle?.players ?? []).find(v => v.playerId === props.playerId);
  const battleEnemy = (foundLastBattle?.players ?? []).find(v => v.playerId !== props.playerId);
  const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle' && battlePlayer && battleEnemy
    ? {isAttacker: foundLastBattle.effect.attacker === props.playerId,
      playerHP: battlePlayer.armdozer.hp,
      enemyHP: battleEnemy.armdozer.hp}
    : null;
  if (lastBattle && !lastBattle.isAttacker && !isGameEnd && !state.isDamageRaceComplete) {
    state.isDamageRaceComplete = true;
    await damageRace(props, lastBattle.playerHP, lastBattle.enemyHP);
  }

  const foundLastState = props.update[props.update.length - 1];
  const latestEnemy = (foundLastState?.players?? []).find(v => v.playerId !== props.playerId);
  const lastState = foundLastState && latestEnemy
    ? {isPlayerTurn: foundLastState.activePlayerId === props.playerId,
      isZeroBatteryChange: latestEnemy.armdozer.battery === 0 && 0 < latestEnemy.armdozer.hp,
      enemyState: latestEnemy}
    : null;
  if (lastState && lastState.isPlayerTurn && lastState.isZeroBatteryChange && !isGameEnd) {
    await zeroBatteryChance(props);
  }

  return state;
}