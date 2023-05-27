import { GameState } from "gbraver-burst-core";

/** パイロットスキルチュートリアル01 ステート */
export type PilotSkillTutorial01State = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** ガイ視察を再生したか、trueで再生した */
  isGaiInspectingComplete: boolean;
  /** ツバサ先輩勝利宣言を再生したか、trueで再生した */
  isDeclarationVictoryComplete: boolean;
};