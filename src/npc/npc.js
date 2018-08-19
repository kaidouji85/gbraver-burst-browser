import type {Armdozer} from "gbraver-burst-core/lib/armdozer/armdozer";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Command} from "gbraver-burst-core/lib/command/command";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";

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