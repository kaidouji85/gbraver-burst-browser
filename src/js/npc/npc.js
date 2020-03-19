import type {Armdozer, Command, GameState, PlayerId} from "gbraver-burst-core";

/**
 * NPCのルーチン
 *
 * @param enemyId 敵のプレイヤーID
 * @param gameStateHistory ゲーム状態の履歴
 * @return コマンド
 */
export type NPCRoutine = (enemyId: PlayerId, gameStateHistory: GameState[]) => Command;

/** NPC */
export type NPC = {
  /** ステータス */
  armdozer: Armdozer,
  /** ルーチン */
  routine: NPCRoutine
};