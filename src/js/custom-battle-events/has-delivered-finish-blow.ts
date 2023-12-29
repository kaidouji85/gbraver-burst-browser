import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { separatePlayersFromLastState } from "./separate-players";

/**
 * ステートヒストリーにトドメの一撃が含まれるかを判定する
 * @param stateHistory ステートヒストリー
 * @param playerId トドメの一撃を放ったプレイヤーID
 * @return トドメの一撃が含まれる場合true、そうでない場合false
 */
function hasDeliveredFinishBlow(
  stateHistory: GameState[],
  playerId: PlayerId,
): boolean {
  return stateHistory.some(
    (state) =>
      state.effect.name === "Battle" &&
      state.effect.attacker === playerId &&
      state.effect.isDeath,
  );
}

/**
 * ステートヒストリーにプレイヤーのトドメの一撃が含まれるかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @return プレイヤーのトドメの一撃が含まれる場合true、そうでない場合false
 */
export function hasPlayerDeliveredFinishBlow(
  props: CustomBattleEventProps,
): boolean {
  const players = separatePlayersFromLastState(props);
  if (players === null) {
    return false;
  }

  const { player } = players;
  return hasDeliveredFinishBlow(props.stateHistory, player.playerId);
}

/**
 * ステートヒストリーに敵のトドメの一撃が含まれるかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @return 敵のトドメの一撃が含まれる場合true、そうでない場合false
 */
export function hasEnemyDeliveredFinishBlow(
  props: CustomBattleEventProps,
): boolean {
  const players = separatePlayersFromLastState(props);
  if (players === null) {
    return false;
  }

  const { enemy } = players;
  return hasDeliveredFinishBlow(props.stateHistory, enemy.playerId);
}
