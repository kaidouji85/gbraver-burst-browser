import type {
  Armdozer,
  Command,
  GameState,
  Pilot,
  PlayerId,
} from "gbraver-burst-core";

/** NPCルーチン関数のパラメータ */
export type NPCRoutineParams = {
  /** 敵のプレイヤーID */
  enemyId: PlayerId;
  /** ゲーム状態の履歴 */
  gameStateHistory: GameState[];
  /** プレイヤーが選択したコマンド */
  playerCommand: Command;
};

/** NPC */
export interface NPC {
  /** アームドーザ */
  armdozer: Armdozer;
  /** パイロット */
  pilot: Pilot;

  /**
   * NPCルーチン関数
   * @param enemyId 敵のプレイヤーID
   * @param gameStateHistory ゲーム状態の履歴
   * @return コマンド
   */
  routine(params: NPCRoutineParams): Command;
}
