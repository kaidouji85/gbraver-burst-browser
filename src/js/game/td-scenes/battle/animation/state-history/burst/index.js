// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {Burst, GameState} from "gbraver-burst-core";
import {updateGauge} from "../update-gauge";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverBurst} from "./shin-braver";
import {delay, empty} from "../../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";

/**
 * バーストアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン情報
 * @param gameState ゲーム状態
 * @return バーストアニメーション
 */
export function burstAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const param = toBurstAnimationParam(view, sceneState, gameState);
  if (!param) {
    return updateGauge(view, sceneState, gameState);
  }
  return delay(500)
    .chain(armdozerAnimation(param))
    .chain(delay(500))
}

/**
 * アームドーザごとのバーストアニメーション
 *
 * @param param バーストアニメパラメータ
 * @return バーストアニメーション
 */
function armdozerAnimation(param: BurstAnimationParam<ArmDozerSprite, CutIn, Burst>): Animate {
  const sprite = param.burstPlayerTD.sprite;
  const cutIn = param.burstPlayerHUD.cutIn;
  if ((sprite instanceof ShinBraver) && (cutIn instanceof ShinBraverCutIn)) {
    const castParam = ((param: any):  BurstAnimationParam<typeof sprite, typeof cutIn, Burst>);
    return shinBraverBurst(castParam);
  }

  return empty();
}