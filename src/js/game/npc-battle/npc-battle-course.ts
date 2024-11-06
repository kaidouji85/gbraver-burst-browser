import { ArmdozerId } from "gbraver-burst-core";

import { NPCBattleStage } from "./npc-battle";

/** NPCバトルコース難易度 */
export type NPCBattleCourseDifficulty = "Easy" | "Normal" | "Hard" | "VeryHard";
/**
 * NPCバトルコースマスタ
 * 本データはプレイヤー状況とそれに対応したコースの組み合わせである
 */
export type NPCBattleCourse = {
  /** プレイヤーが選択したアームドーザID */
  armdozerId: ArmdozerId;

  /** プレイヤーが選択した難易度 */
  difficulty: NPCBattleCourseDifficulty;

  /** 本コースの全ステージ */
  stages: NPCBattleStage[];
};
