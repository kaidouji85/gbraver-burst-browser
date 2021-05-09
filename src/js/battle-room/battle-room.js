// @flow

import type {Command, GameState} from "gbraver-burst-core";

/** 戦闘を進める */
export interface BattleProgress {
  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return 結果
   */
  progress(command: Command): Promise<GameState[]>
}

/**
 * バトルルーム
 */
export interface BattleRoom extends BattleProgress {}