import type { GameState } from "gbraver-burst-core";

/** 選択可能なコマンド */
export type SelectableCommands = "BurstOnly" | "PilotSkillOnly" | "All";

/** バーストチュートリアルのステート */
export type BurstTutorialState = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];

  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;

  /** 5防御しないと負けを再生したか、trueで再生した */
  isLoseIfNoDefense5Complete: boolean;

  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands;
};
