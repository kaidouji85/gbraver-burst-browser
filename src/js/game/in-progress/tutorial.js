// @flow
import type {TutorialStage, TutorialState} from "../tutorial";
import {createTutorialState} from "../tutorial";

/** チュートリアル */
export type Tutorial = {
  type: 'Tutorial',
  /** チュートリアルのステート */
  state: TutorialState,
};

/**
 * チュートリアルステートを生成するヘルパー関数
 *
 * @param stages チュートリアルステージをあつめたもの
 * @return 生成結果
 */
export function createTutorial(stages: TutorialStage[]): Tutorial {
  return {type: 'Tutorial', state: createTutorialState(stages)};
}