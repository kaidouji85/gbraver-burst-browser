// @flow

import type {Armdozer, Command, GameState, PlayerId, Pilot} from "gbraver-burst-core";

/** NPC */
export interface NPC {
  /** アームドーザ */
  armdozer: Armdozer;

  /** パイロット */
  pilot: Pilot;

  /**
   * NPCのルーチン
   *
   * @param enemyId 敵のプレイヤーID
   * @param gameStateHistory ゲーム状態の履歴
   * @return コマンド
   */
  routine(enemyId: PlayerId, gameStateHistory: GameState[]): Command;
}