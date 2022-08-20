// @flow
import type {Battle, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {ReferableBattleSceneProps} from "../referable-battle-scene-props";
import {toBattleAnimationParam} from "./animation-param";
import {attackAnimation} from "./attack";

/**
 * 戦闘アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function battleAnimation(props: ReferableBattleSceneProps , gameState: GameStateX<Battle>): Animate {
  const param = toBattleAnimationParam(props, gameState);
  if (!param) {
    return empty();
  }

  return attackAnimation(param);
}

