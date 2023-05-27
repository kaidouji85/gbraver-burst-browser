import { TutorialStageID } from "../tutorial-stages/tutorial-stage";

/** チュートリアルステージ選択完了 */
export type SelectTutorialStage = {
  type: "SelectTutorialStage";
  /** ステージID */
  id: TutorialStageID;
  /** ステージレベル */
  level: number;
};
