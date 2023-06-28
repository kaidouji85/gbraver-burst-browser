import type { BatteryEnchantmentSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { TsubasaHUD } from "../../../view/hud/pilot-objects/tsubasa";
import { dolly, toInitial, track } from "../../td-camera";
import type { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ツバサ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type TsubasaAnimationParamX<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, TsubasaHUD>;

/**
 * パイロットスキル ツバサ アニメーションパラメータ
 */
export type TsubasaAnimationParam = TsubasaAnimationParamX<PilotSkill>;

/**
 * ツバサ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function tsubasaAnimation(param: TsubasaAnimationParam): Animate {
  if (param.skill.type === "BatteryEnchantmentSkill") {
    const skill: BatteryEnchantmentSkill = param.skill;
    return tsubasaBatteryEnchantment({ ...param, skill });
  }

  return empty();
}

/**
 * ツバサ バッテリー回復 アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function tsubasaBatteryEnchantment(
  param: TsubasaAnimationParamX<BatteryEnchantmentSkill>
): Animate {
  return all(
    param.pilot.cutIn.show(),
    param.isActivePlayer
      ? param.invokerSprite.endActive()
      : param.anotherSprite.endActive(),
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, "-40", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.batteryEnchantment.popUp())
    .chain(
      all(
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500)
      )
    )
    .chain(delay(200));
}
