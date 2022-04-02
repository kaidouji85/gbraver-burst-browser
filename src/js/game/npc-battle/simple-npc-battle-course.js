// @flow
import type {NPCBattleCourse} from "./npc-battle-course";
import type {StageLevel} from "./npc-battle-stage";
import type {NPCBattleStage} from "../npc-battle";
import {DefaultStage} from "../npc-battle-course-master";

/** NPCバトルコースのシンプルな実装 */
export class SimpleNPCBattleCourse implements NPCBattleCourse {
  _stages: NPCBattleStage[];

  /**
   * コンストラクタ
   *
   * @param stages コースに含まれる全ステージ
   */
  constructor(stages: NPCBattleStage[]) {
    this._stages = stages;
  }

  /** @override */
  stage(level: StageLevel): NPCBattleStage {
    return this._stages[level - 1] ?? DefaultStage;
  }

  /** @override */
  lastStageLevel(): StageLevel {
    return this._stages.length;
  }
}