// @flow
import type { BuffPowerSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { GaiHUD } from "../../../view/hud/pilot-objects/gai";
import { dolly, toInitial, track } from "../../td-camera";
import type { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ガイ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type GaiAnimationParamX<SKILL: PilotSkill> = PilotSkillAnimationParamX<
  SKILL,
  GaiHUD
>;

/**
 * パイロットスキル ガイ アニメーションパラメータ
 */
export type GaiAnimationParam = GaiAnimationParamX<PilotSkill>;

/**
 * ガイ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function gaiAnimation(param: GaiAnimationParam): Animate {
  if (param.skill.type === "BuffPowerSkill") {
    const skill: BuffPowerSkill = param.skill;
    return gaiBuffPower({ ...param, skill });
  }

  return empty();
}

/**
 * ガイ 攻撃バフ アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function gaiBuffPower(param: GaiAnimationParamX<BuffPowerSkill>): Animate {
  return all(
    param.pilot.cutIn.show(),
    param.isActivePlayer ? param.invokerSprite.endActive() : empty(),
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, "-40", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible()
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.powerUp.popUp())
    .chain(
      all(
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500)
      )
    )
    .chain(delay(200));
}
