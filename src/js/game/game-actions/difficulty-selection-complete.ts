import { NPCBattleCourseDifficulty } from "../npc-battle/courses/npc-battle-course";

/** 難易度選択完了 */
export type DifficultySelectionComplete = {
  type: "DifficultySelectionComplete";
  /** 選択した難易度 */
  difficulty: NPCBattleCourseDifficulty;
};
