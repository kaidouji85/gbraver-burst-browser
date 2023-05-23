import type { GameState } from "gbraver-burst-core";

/** バッテリーシステムチュートリアル ステート */
export type BatterySystemTutorialState = {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** バッテリーシステムの解説が完了しているか、trueで完了している */
  isBatterySystemDescriptionComplete: boolean;
};
