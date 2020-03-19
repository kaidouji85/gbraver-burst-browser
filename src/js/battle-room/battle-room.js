// @flow

import type {Command, GameState, Player, PlayerId} from "gbraver-burst-core";

/** 初期状態 */
export type InitialState = {
  playerId: PlayerId,
  players: Player[],
  stateHistory: GameState[]
};

/**
 * 戦闘を開始する
 */
export interface BattleStart {
  /**
   * 戦闘を開始する
   *
   * @return 初期状態
   */
  start(): Promise<InitialState>;
}

/**
 * 戦闘を進める
 */
export interface BattleProgress {
  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return 結果
   */
  progress(command: Command): Promise<GameState[]>
}

/** バトルルーム */
export interface BattleRoom extends BattleStart, BattleProgress {}