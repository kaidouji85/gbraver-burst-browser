// @flow

import {Animate} from "../../../../../animation/animate";
import type {MyTurnAnimationParam} from "./animation-param";
import {dolly, toInitial, track} from "../td-camera";
import {delay} from "../../../../../animation/delay";
import {castShinBraverMyTUrn, shinBraverMyTurn} from "./shin-braver";
import {castNeoLandozerMyTurn, neoLandozerMyTurn} from "./neo-landozer";
import {castLightningDozerMyTurn, lightningDozerMyTurn} from "./lightning-dozer";
import {castWingDozerMyTurnParam, wingDozerMyTurn} from "./wing-dozer";
import {all} from "../../../../../animation/all";

/**
 * マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
export function myTurnAnimation(param: MyTurnAnimationParam, effects: Animate): Animate {
  const shinBraver = castShinBraverMyTUrn(param);
  if (shinBraver) {
    return shinBraverMyTurn(shinBraver, effects);
  }

  const neoLandozer = castNeoLandozerMyTurn(param);
  if (neoLandozer) {
    return neoLandozerMyTurn(neoLandozer, effects);
  }

  const lightningDozer = castLightningDozerMyTurn(param);
  if (lightningDozer) {
    return lightningDozerMyTurn(lightningDozer, effects);
  }

  const wingDozer = castWingDozerMyTurnParam(param);
  if (wingDozer) {
    return wingDozerMyTurn(wingDozer, effects);
  }

  return defaultMyTurn(param, effects);
}

/**
 * デフォルト マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
function defaultMyTurn(param: MyTurnAnimationParam, effects: Animate): Animate {
  return all(
    track(param.tdCamera, param.tdArmdozer.sprite().getObject3D().position.x, 500),
    dolly(param.tdCamera, '-40', 500)
  )
    .chain(delay(500))
    .chain(effects)
    .chain(toInitial(param.tdCamera, 500))
    .chain(delay(500));
}