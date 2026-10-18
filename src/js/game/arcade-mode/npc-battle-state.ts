import { Player } from "gbraver-burst-core";

import { NPCBattleStage } from "./stages/npc-battle-stage";

/** NPCバトルの状態 */
export type NPCBattleState = {
  /** プレイヤー */
  player: Player;
  /**
   * NPCバトル全ステージ
   * ルート分岐はなく、stages[0] -> stages[1] ... と順番に進んでいく
   */
  stages: NPCBattleStage[];
  /**
   * 現在プレイ中のステージ
   * stagesの配列indexに相当する
   */
  stageIndex: number;
};
