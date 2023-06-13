import {TutorialStageID} from "../../../game/tutorial-stages/tutorial-stage";

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;
  /** チュートリアルステージタイトル */
  title: string;
};