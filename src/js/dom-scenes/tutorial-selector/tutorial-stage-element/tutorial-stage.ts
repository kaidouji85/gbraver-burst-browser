import {
  TutorialStageID,
  TutorialType,
} from "../../../game/tutorial-stages/tutorial-stage";

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;
  /** チュートリアルタイプ */
  type: TutorialType;
  /** チュートリアルステージタイトル */
  title: string;
};
