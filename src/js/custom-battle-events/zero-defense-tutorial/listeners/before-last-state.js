// @flow
import type {Battle, GameState, GameStateX} from "gbraver-burst-core";
import type {LastState} from "../../../game/td-scenes/battle/custom-battle-event";
import {extractBattle, extractGameEnd} from "../../game-state-extractor";
import type {ZeroDefenseTutorialState} from "../state";
import {damageRace} from "../stories/damage-race";
import {introduction} from "../stories/introduction";
import {zeroBatteryChance} from "../stories/zero-battery-chance";

/**
 * ダメージレースストーリーに必要となる情報を抽出する
 * 抽出できない場合、nullを返す
 *
 * @param props イベントプロパティ
 * @return 抽出結果
 */
function extractDamageRace(props: $ReadOnly<LastState>) {
  const extractedBattle = extractBattle(props.update);
  if (!extractedBattle) {
    return null;
  }

  const battle: GameStateX<Battle> = extractedBattle;
  const player = battle.players.find(v => v.playerId === props.playerId);
  const enemy = battle.players.find(v => v.playerId !== props.playerId);
  if (!player || !enemy) {
    return null;
  }

  return battle.effect.attacker !== props.playerId ? {player, enemy} : null;
}

/**
 * 0バッテリーチャンスストーリーを再生するべきかを判定する
 *
 * @param props イベントプロパティ
 * @return 判定結果、trueで再生するべき
 */
function isZeroBatteryChance(props: $ReadOnly<LastState>): boolean {
  const foundLastState = props.update[props.update.length - 1];
  if (!foundLastState) {
    return false;
  }

  const lastState: GameState = foundLastState;
  const enemy = lastState.players.find(v => v.playerId !== props.playerId);
  if (!enemy) {
    return false;
  }

  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  return isPlayerTurn && (enemy.armdozer.battery === 0) && (0 < enemy.armdozer.hp);
}

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
  if (extractedGameEnd) {
    return updatedStateHistory;
  }

  const extractedDamageRace = extractDamageRace(props);
  if (extractedDamageRace && !state.isDamageRaceComplete) {
    const {player, enemy} = extractedDamageRace
    await damageRace(props, player.armdozer.hp, enemy.armdozer.hp);
  }

  if (isZeroBatteryChance(props)) {
    await zeroBatteryChance(props);
  }

  return {...updatedStateHistory, isDamageRaceComplete: !!extractedDamageRace}
}