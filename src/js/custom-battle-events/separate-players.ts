import { GameState, PlayerState } from "gbraver-burst-core";

import {
  CustomBattleEventProps,
  CustomStateAnimation,
} from "../td-scenes/battle/custom-battle-event";

/** 分割されたプレイヤー */
type SeparatedPlayers = {
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
};

/**
 * プレイヤーを自キャラ、敵に分割する
 * @param props カスタムバトルイベントプロパティ
 * @param state ゲームステート
 * @returns 分割されたプレイヤー、分割できない場合null
 */
export function separatePlayers(
  props: Readonly<CustomBattleEventProps>,
  state: Readonly<GameState>,
) {
  const player = state.players.find(
    (player) => player.playerId === props.playerId,
  );
  const enemy = state.players.find(
    (player) => player.playerId !== props.playerId,
  );
  return player && enemy ? { player, enemy } : null;
}

/**
 * 最終ステートからプレイヤーを自キャラ、敵に分割する
 * @param props カスタムバトルイベントプロパティ
 * @returns 分割されたプレイヤー、分割できない場合null
 */
export function separatePlayersFromLastState(
  props: Readonly<CustomBattleEventProps>,
): SeparatedPlayers | null {
  const lastState = props.stateHistory.at(-1);
  return lastState ? separatePlayers(props, lastState) : null;
}

/**
 * 現在ステートからプレイヤーを自キャラ、敵に分割する
 * @param props カスタムバトルイベントプロパティ
 * @returns 分割されたプレイヤー、分割できない場合null
 */
export function separatePlayersFromCurrentState(
  props: Readonly<CustomStateAnimation>,
): SeparatedPlayers | null {
  return separatePlayers(props, props.currentState);
}
