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

/** パイロットスキル ツバサ アニメーションパラメータ */
export type TsubasaAnimationParam = TsubasaAnimationParamX<PilotSkill>;

/**
 * ツバサ パイロットスキルアニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function tsubasaAnimation(param: TsubasaAnimationParam): Animate {
  if (param.skill.type === "BatteryEnchantmentSkill") {
    const skill: BatteryEnchantmentSkill = param.skill;
    return tsubasaBatteryEnchantment({ ...param, skill });
  }

  return empty();
}

/** イン アニメーション時間 */
const inDuration = 400;
/** アウト アニメーション時間 */
const outDuration = 400;

/**
 * ツバサ バッテリー回復 アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function tsubasaBatteryEnchantment(
  param: TsubasaAnimationParamX<BatteryEnchantmentSkill>,
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
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.batteryEnchantment.popUp())
    .chain(
      all(
        toInitial(param.tdCamera, outDuration),
        param.tdObjects.skyBrightness.brightness(1, outDuration),
        param.tdObjects.illumination.intensity(1, outDuration),
      ),
    )
    .chain(delay(200));
}
