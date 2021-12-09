// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import type {NPCBattleStage, StageLevel} from "./npc-battle-stage";

/** NPCバトルコース難易度 */
export type NPCBattleCourseDifficulty = 'Easy' | 'Normal' | 'Hard';

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
   * @reutrn NPCバトルコース
   */
  find(armdozerId: ArmDozerId): NPCBattleCourse;
}