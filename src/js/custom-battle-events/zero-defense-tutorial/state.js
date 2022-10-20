// @flow
import type { GameState } from "gbraver-burst-core";

/** 選択可能なコマンド */
export type SelectableCommands = "BurstOnly" | "PilotSkillOnly" | "All";

/** 0防御チュートリアルステート */
export type ZeroDefenseTutorialState = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[],
  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands,
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean,
  /** ダメージレースストーリーを再生したか、trueで再生した */
  isDamageRaceComplete: boolean,
};
