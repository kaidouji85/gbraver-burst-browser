// @flow

import type {Command, GameState} from "gbraver-burst-core";

/** バトル進行 */
export interface BattleProgress {
  /**
   * 戦闘を進める
   *
   * @param command プレイヤーが入力したコマンド
   * @return 結果
   */
  progress(command: Command): Promise<GameState[]>
}