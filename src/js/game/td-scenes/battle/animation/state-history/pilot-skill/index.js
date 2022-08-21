// @flow
import type {GameStateX, PilotSkillEffect} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {ShinyaHUD} from "../../../view/hud/pilot-objects/shinya";
import type {StateAnimationProps} from "../state-animation-props";
import type {PilotSkillAnimationParam} from "./animation-param";
import {castPilotSkillAnimationParam} from "./animation-param";
import {castGaiAnimationParam, gaiAnimation} from "./gai";
import {castRaitoAnimationParam, raitoAnimation} from "./raito";
import {shinyaAnimation} from "./shinya";
import {castTsubasaAnimationParam, tsubasaAnimation} from "./tsubasa";

/**
 * パイロット効果 アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function pilotSkillAnimation(props: StateAnimationProps, gameState: GameStateX<PilotSkillEffect>): Animate {
  const param = castPilotSkillAnimationParam(props, gameState);
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
  if (param.pilot instanceof ShinyaHUD) {
    const pilot: ShinyaHUD = param.pilot;
    return shinyaAnimation({...param, pilot});
  }

  const gai = castGaiAnimationParam(param);
  if (gai) {
    return gaiAnimation(gai);
  }

  const raito = castRaitoAnimationParam(param);
  if (raito) {
    return raitoAnimation(raito);
  }

  const tsubasa = castTsubasaAnimationParam(param);
  if (tsubasa) {
    return tsubasaAnimation(tsubasa);
  }

  return empty();
}

