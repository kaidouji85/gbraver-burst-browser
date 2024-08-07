import { BuffPowerSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { GaiHUD } from "../../../view/hud/pilot-objects/gai";
import { toInitial } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ガイ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type GaiAnimationParam<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, GaiHUD>;

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
  param: GaiAnimationParam<PilotSkill>,
): Animate {
  const x = param.invokerSprite.getObject3D().position.x;
  const z = "-20";
  return all(
    param.tdCamera.move({ x, z }, inDuration),
    param.tdCamera.lookAt({ x, z }, inDuration),
  );
}

/**
 * ガイ 攻撃バフ アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function gaiBuffPower(param: GaiAnimationParam<BuffPowerSkill>): Animate {
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

/**
 * ガイ パイロットスキル アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function gaiAnimation(param: GaiAnimationParam<PilotSkill>): Animate {
  if (param.skill.type === "BuffPowerSkill") {
    const skill: BuffPowerSkill = param.skill;
    return gaiBuffPower({ ...param, skill });
  }

  return empty();
}
