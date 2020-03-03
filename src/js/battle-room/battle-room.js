// @flow

import type {Command, GameState, Player, PlayerId} from "gbraver-burst-core";

/** 初期状態 */
export type InitialState = {
  playerId: PlayerId,
  players: Player[],
  stateHistory: GameState[]
};

/** バトルルーム */
export interface BattleRoom {
  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return 結果
   */
  progress(command: Command): Promise<GameState[]>
}