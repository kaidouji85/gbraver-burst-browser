import type { GameState, PlayerState } from "gbraver-burst-core";
import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * 最新のプレイヤーステートを抽出する
 *
 * @param props カスタムイベントプロパティ
 * @param stateHistory ステートヒストリー
 * @return 抽出結果、抽出できない場合はnullを返す
 */
export function extractLastPlayer(props: CustomBattleEventProps, stateHistory: GameState[]): PlayerState | null | undefined {
  const lastState = stateHistory[stateHistory.length - 1];

  if (!lastState) {
    return null;
  }

  return lastState.players.find(v => v.playerId === props.playerId) ?? null;
}

/**
 * 最新の敵ステートを抽出する
 *
 * @param props カスタムイベントプロパティ
 * @param stateHistory ステートヒストリー
 * @return 抽出結果、抽出できない場合はnullを返す
 */
export function extractLastEnemy(props: CustomBattleEventProps, stateHistory: GameState[]): PlayerState | null | undefined {
  const lastState = stateHistory[stateHistory.length - 1];

  if (!lastState) {
    return null;
  }

  return lastState.players.find(v => v.playerId !== props.playerId) ?? null;
}