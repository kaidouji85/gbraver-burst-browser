import { DamageHalvedSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { RaitoHUD } from "../../../view/hud/pilot-objects/raito";
import { dolly, toInitial, track } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ライト アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type RaitoAnimationParam<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, RaitoHUD>;

/** イン アニメーション時間 */
const inDuration = 400;
/** アウト アニメーション時間 */
const outDuration = 400;

/**
 * ライト ダメージ半減 アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function raitoDamageHalved(
  param: RaitoAnimationParam<DamageHalvedSkill>,
): Animate {
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
    param.attackerTDArmdozer.sprite().endActive(),
    param.defenderHUD.predicatedDamage.hidden(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.damageHalved.popUp())
    .chain(
      all(
        toInitial(param.tdCamera, outDuration),
        param.tdObjects.skyBrightness.brightness(1, outDuration),
        param.tdObjects.illumination.intensity(1, outDuration),
      ),
    )
    .chain(delay(200));
}

/**
 * ライト パイロットスキル アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function raitoAnimation(
  param: RaitoAnimationParam<PilotSkill>,
): Animate {
  if (param.skill.type === "DamageHalvedSkill") {
    const skill: DamageHalvedSkill = param.skill;
    return raitoDamageHalved({ ...param, skill });
  }

  return empty();
}
