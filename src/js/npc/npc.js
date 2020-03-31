import type {Armdozer, Command, GameState, PlayerId} from "gbraver-burst-core";

/** NPC */
export interface NPC {
  /**
   * ステータス
   */
  armdozer: Armdozer,

  /**
   * NPCのルーチン
   *
   * @param enemyId 敵のプレイヤーID
   * @param gameStateHistory ゲーム状態の履歴
   * @return コマンド
   */
  routine(enemyId: PlayerId, gameStateHistory: GameState[]): Command;
}