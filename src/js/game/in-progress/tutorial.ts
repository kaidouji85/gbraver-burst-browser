import type { TutorialStage } from "../tutorial-stages/tutorial-stage";

/** チュートリアル */
export type Tutorial = {
  type: "Tutorial";
  /** サブフロー */
  tutorial: TutorialSubFLow;
};

/** チュートリアルのサブフロー */
type TutorialSubFLow = TutorialStageSelect | PlayingTutorialStage;

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
