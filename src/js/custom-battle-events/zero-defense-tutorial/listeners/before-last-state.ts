import type { Battle, GameState, GameStateX } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { extractBattle, extractGameEnd } from "../../game-state-extractor";
import type { ZeroDefenseTutorialState } from "../state";
import { damageRace } from "../stories/damage-race";
import { introduction } from "../stories/introduction";
import { zeroBatteryChance } from "../stories/zero-battery-chance";

/**
 * 条件を満たした場合、ダメージレースストーリーを再生する
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
async function doDamageRaceOrNothing(props: Readonly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  if (state.isDamageRaceComplete) {
    return state;
  }

  const extractedBattle = extractBattle(props.update);

  if (!extractedBattle) {
    return state;
  }

  const battle: GameStateX<Battle> = extractedBattle;
  const player = battle.players.find(v => v.playerId === props.playerId);
  const enemy = battle.players.find(v => v.playerId !== props.playerId);
  const isEnemyAttack = battle.effect.attacker !== props.playerId;

  if (player && enemy && isEnemyAttack) {
    await damageRace(props, player.armdozer.hp, enemy.armdozer.hp);
    return { ...state,
      isDamageRaceComplete: true
    };
  }

  return state;
}

/**
 * 条件を満たした場合、0バッテリーチャンスを再生する
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
async function doZeroBatteryChangeOrNothing(props: Readonly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  if (state.isZeroBatteryChangeComplete) {
    return state;
  }

  const foundLastState = props.update[props.update.length - 1];

  if (!foundLastState) {
    return state;
  }

  const lastState: GameState = foundLastState;
  const enemy = lastState.players.find(v => v.playerId !== props.playerId);

  if (!enemy) {
    return state;
  }

  const isPlayerTurn = lastState.activePlayerId === props.playerId;

  if (isPlayerTurn && enemy.armdozer.battery === 0 && 0 < enemy.armdozer.hp) {
    await zeroBatteryChance(props);
    return { ...state,
      isZeroBatteryChangeComplete: true
    };
  }

  return state;
}

/**
 * 最終ステート直前イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function beforeLastState(props: Readonly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  const updatedStateHistory = { ...state,
    stateHistory: [...state.stateHistory, ...props.update]
  };

  if (!state.isIntroductionComplete) {
    await introduction(props);
    return { ...updatedStateHistory,
      isIntroductionComplete: true
    };
  }

  if (extractGameEnd(props.update)) {
    return updatedStateHistory;
  }

  const updatedByDamageRace = await doDamageRaceOrNothing(props, updatedStateHistory);
  return await doZeroBatteryChangeOrNothing(props, updatedByDamageRace);
}