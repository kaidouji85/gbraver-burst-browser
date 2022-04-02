// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import type {StageLevel} from "./npc-battle-stage";
import type {NPCBattleStage} from "../npc-battle";
import type {NPCBattleCourseDifficulty} from "../npc-battle-course-master";

/** NPCバトルコース */
export interface NPCBattleCourse {
  /**
   * 指定したステージを取得する
   * 
   * @param level ステージレベル
   * @return ステージ
   */
  stage(level: StageLevel): NPCBattleStage;

  /**
   * ラストステージのレベルを返す
   * 
   * @return ラストステージのレベル
   */
  lastStageLevel(): StageLevel;
}

/** NPCバトルコースを集めたもの */
export interface NPCBattleCourseContainer {
  /**
   * 指定したNPCバトルコールを取得する
   *
   * @param armdozerId プレイヤーのアームドーザID
   * @param difficulty NPCバトルコース難易度
   * @reutrn NPCバトルコース
   */
  find(armdozerId: ArmDozerId, difficulty: NPCBattleCourseDifficulty): NPCBattleCourse;
}