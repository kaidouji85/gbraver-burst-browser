// @flow
import type {TutorialStage, TutorialState} from "../tutorial";
import {createTutorialState} from "../tutorial";

/** チュートリアル */
export type Tutorial = {
  type: 'Tutorial',
  /** サブフロー */
  subFlow: SubFLow,
  /** @deprecated チュートリアルのステート */
  state: TutorialState,
};

/** サブフロー */
type SubFLow = TutorialStageSelect | PlayingTutorialStage;

/** チュートリアルステージ選択 */
export type TutorialStageSelect = {
  type: 'TutorialStageSelect'
};

/** チュートリアルステージプレイ中 */
export type PlayingTutorialStage = {
  type: 'PlayingTutorialStage',
  /** プレイ中のチュートリアルステージID */
  stage: TutorialStage,
  /** プレイ中のチュートリアルステージレベル */
  level: number,
};

/**
 * チュートリアルステートを生成するヘルパー関数
 *
 * @param stages チュートリアルステージをあつめたもの
 * @return 生成結果
 */
export function createTutorial(stages: TutorialStage[]): Tutorial {
  return {type: 'Tutorial', subFlow: {type: 'TutorialStageSelect'}, state: createTutorialState(stages)};
}