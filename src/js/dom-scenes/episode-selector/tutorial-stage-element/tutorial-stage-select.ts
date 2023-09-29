import { TutorialStageID } from "../../../game/tutorial-stages/tutorial-stage";

/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID;
  /** ステージレベル */
  level: number;
};
