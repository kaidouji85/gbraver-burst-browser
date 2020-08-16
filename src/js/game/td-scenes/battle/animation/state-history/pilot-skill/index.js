// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {delay, empty} from "../../../../../../animation/delay";
import {Animate} from "../../../../../../animation/animate";
import {castPilotSkillAnimationParam} from "./animation-param";
import type {PilotSkillAnimationParam} from "./animation-param";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";

/**
 * パイロット効果 アニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function pilotAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const param = castPilotSkillAnimationParam(view, sceneState, gameState);
  if (!param) {
    return empty();
  }

  return cutIn(param);
}

/**
 * パイロットカットイン
 *
 * @param param パラメータ
 * @return アニメーション
 */
function cutIn(param: PilotSkillAnimationParam): Animate {
  return  all(
    param.invokerHUD.pilot.show(),
    attentionArmDozer(param.tdCamera, param.invokerSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(2000))
    .chain(all(
      param.invokerHUD.pilot.hidden(),
      param.hudObjects.rearmostFader.opacity(0, 300))
    ).chain(delay(500))
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ));
}

