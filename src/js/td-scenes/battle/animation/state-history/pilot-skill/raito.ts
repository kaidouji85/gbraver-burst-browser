import type { DamageHalvedSkill, PilotSkill } from "gbraver-burst-core";
import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { RaitoHUD } from "../../../view/hud/pilot-objects/raito";
import { dolly, toInitial, track } from "../../td-camera";
import type { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ライト アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type RaitoAnimationParamX<SKILL extends PilotSkill> = PilotSkillAnimationParamX<SKILL, RaitoHUD>;

/**
 * パイロットスキル ライト アニメーションパラメータ
 */
export type RaitoAnimationParam = RaitoAnimationParamX<PilotSkill>;

/**
 * ライト パイロットスキルアニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function raitoAnimation(param: RaitoAnimationParam): Animate {
  if (param.skill.type === "DamageHalvedSkill") {
    const skill: DamageHalvedSkill = param.skill;
    return raitoDamageHalved({ ...param,
      skill
    });
  }

  return empty();
}

// TODO ダメージ半減画像を追加する

/**
 * ライト ダメージ半減 アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function raitoDamageHalved(param: RaitoAnimationParamX<DamageHalvedSkill>): Animate {
  return all(param.pilot.cutIn.show(), param.isActivePlayer ? param.invokerSprite.endActive() : param.anotherSprite.endActive(), track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500), dolly(param.tdCamera, "-40", 500), param.tdObjects.skyBrightness.brightness(0.2, 500), param.tdObjects.illumination.intensity(0.2, 500), param.tdObjects.turnIndicator.invisible()).chain(delay(800)).chain(param.pilot.cutIn.hidden()).chain(delay(200)).chain(param.invokerTD.armdozerEffects.damageHalved.popUp()).chain(all(toInitial(param.tdCamera, 500), param.tdObjects.skyBrightness.brightness(1, 500), param.tdObjects.illumination.intensity(1, 500))).chain(delay(200));
}