import type {Armdozer} from "gbraver-burst-core";
import type {GameState} from "gbraver-burst-core";
import type {Command} from "gbraver-burst-core";
import type {PlayerId} from "gbraver-burst-core";

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