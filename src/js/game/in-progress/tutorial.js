// @flow
import type {PlayerId} from "gbraver-burst-core";
import {playerUuid} from "../../uuid/player";
import type {TutorialStage, TutorialState} from "../tutorial";
import {createTutorialState} from "../tutorial";

/** チュートリアル */
export type Tutorial = {
  type: 'Tutorial',
  state: TutorialState,
  /**
   * @deprecated
   * プレイヤーID
   */
  playerId: PlayerId
};

/**
 * チュートリアルステートを生成するヘルパー関数
 *
 * @param stages チュートリアルステージをあつめたもの
 * @return 生成結果
 */
export function createTutorial(stages: TutorialStage[]): Tutorial {
  return {type: 'Tutorial', state: createTutorialState(stages), playerId: playerUuid()};
}