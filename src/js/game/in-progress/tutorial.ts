import type { TutorialStage } from "../tutorial-stages";

/** チュートリアル */
export type Tutorial = {
  type: "Tutorial";

  /** サブフロー */
  subFlow: SubFLow;
};

/** サブフロー */
type SubFLow = TutorialStageSelect | PlayingTutorialStage;

/** チュートリアルステージ選択 */
export type TutorialStageSelect = {
  type: "TutorialStageSelect";
};

/** チュートリアルステージプレイ中 */
export type PlayingTutorialStage = {
  type: "PlayingTutorialStage";

  /** プレイ中のチュートリアルステージID */
  stage: TutorialStage;

  /** プレイ中のチュートリアルステージレベル */
  level: number;
};
