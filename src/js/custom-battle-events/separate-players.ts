import { GameState, PlayerState } from "gbraver-burst-core";

import {
  CustomBattleEventProps,
  CustomStateAnimationProps,
  LastStateContainer,
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
): SeparatedPlayers | null {
  const player = state.players.find((p) => p.playerId === props.playerId);
  const enemy = state.players.find((p) => p.playerId === props.enemyId);
  return player && enemy ? { player, enemy } : null;
}

/**
 * プレイヤーを自キャラ、敵に分割する、分割できない場合は例外を投げる
 * @param props カスタムバトルイベントプロパティ
 * @param state ゲームステート
 * @returns 分割されたプレイヤー
 */
export const separatePlayersOrThrow = (
  props: Readonly<CustomBattleEventProps>,
  state: Readonly<GameState>,
): SeparatedPlayers => {
  const separated = separatePlayers(props, state);
  if (!separated) {
    throw new Error(
      `Failed to separate players: playerId=${props.playerId}, enemyId=${props.enemyId}`,
    );
  }
  return separated;
};

/**
 * @deprecated
 * 最終ステートからプレイヤーを自キャラ、敵に分割する
 * @param props カスタムバトルイベントプロパティ
 * @returns 分割されたプレイヤー、分割できない場合null
 */
export const separatePlayersFromLastState = (
  props: CustomBattleEventProps & LastStateContainer,
) => separatePlayers(props, props.lastState);

/**
 * @deprecated
 * 現在ステートからプレイヤーを自キャラ、敵に分割する
 * @param props カスタムバトルイベントプロパティ
 * @returns 分割されたプレイヤー、分割できない場合null
 */
export const separatePlayersFromCurrentState = (
  props: Readonly<CustomStateAnimationProps>,
) => separatePlayers(props, props.currentState);
