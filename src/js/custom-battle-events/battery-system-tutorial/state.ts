import type { GameState } from "gbraver-burst-core";

/** 選択可能なコマンド */
export type SelectableCommands = "BatteryOnly" | "BurstOnly" | "PilotSkillOnly" | "All";

/** バッテリーシステムチュートリアル ステート */
export type BatterySystemTutorialState = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];

  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands;

  /** バッテリーシステムの解説が完了しているか、trueで完了している */
  isBatterySystemDescriptionComplete: boolean;
};