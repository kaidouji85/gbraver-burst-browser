import { BatteryEnhancementSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { TsubasaHUD } from "../../../view/hud/pilot-objects/tsubasa";
import { toInitial } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ツバサ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type TsubasaAnimationParam<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, TsubasaHUD>;

/** イン アニメーション時間 */
const inDuration = 400;
/** アウト アニメーション時間 */
const outDuration = 400;

/**
 * パイロットスキル発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToPilotSkillPlayer(
  param: TsubasaAnimationParam<PilotSkill>,
): Animate {
  const x = param.invokerSprite.getObject3D().position.x;
  const z = "-20";
  return all(
    param.tdCamera.move({ x, z }, inDuration),
    param.tdCamera.lookAt({ x, z }, inDuration),
  );
}

/**
 * ツバサ バッテリー増強 アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function tsubasaBatteryEnhancement(
  param: TsubasaAnimationParam<BatteryEnhancementSkill>,
): Animate {
  return all(
    param.pilot.cutIn.show(),
    focusToPilotSkillPlayer(param),
    param.tdObjects.skyBrightness.brightness(0.2, inDuration),
    param.tdObjects.illumination.intensity(0.2, inDuration),
    param.attackerTDArmdozer.sprite().endActive(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.batteryEnhancement.popUp())
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
 * ツバサ パイロットスキルアニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function tsubasaAnimation(
  param: TsubasaAnimationParam<PilotSkill>,
): Animate {
  if (param.skill.type === "BatteryEnhancementSkill") {
    const skill: BatteryEnhancementSkill = param.skill;
    return tsubasaBatteryEnhancement({ ...param, skill });
  }

  return empty();
}
