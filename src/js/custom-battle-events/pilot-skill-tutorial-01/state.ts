import { GameState } from "gbraver-burst-core";

/** パイロットスキルチュートリアル01 ステート */
export type PilotSkillTutorial01State = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
};