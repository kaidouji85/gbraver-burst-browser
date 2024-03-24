import { BuffPowerSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { GaiHUD } from "../../../view/hud/pilot-objects/gai";
import { dolly, toInitial, track } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ガイ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type GaiAnimationParamX<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, GaiHUD>;

/** パイロットスキル ガイ アニメーションパラメータ */
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

/** イン アニメーション時間 */
const inDuration = 400;
/** アウト アニメーション時間 */
const outDuration = 400;

/**
 * ガイ 攻撃バフ アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function gaiBuffPower(param: GaiAnimationParamX<BuffPowerSkill>): Animate {
  return all(
    param.pilot.cutIn.show(),
    track(
      param.tdCamera,
      param.invokerSprite.getObject3D().position.x,
      inDuration,
    ),
    dolly(param.tdCamera, "-20", inDuration),
    param.tdObjects.skyBrightness.brightness(0.2, inDuration),
    param.tdObjects.illumination.intensity(0.2, inDuration),
    param.activeTDArmdozer.sprite().endActive(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.powerUp.popUp())
    .chain(
      all(
        toInitial(param.tdCamera, outDuration),
        param.tdObjects.skyBrightness.brightness(1, outDuration),
        param.tdObjects.illumination.intensity(1, outDuration),
      ),
    )
    .chain(delay(200));
}
