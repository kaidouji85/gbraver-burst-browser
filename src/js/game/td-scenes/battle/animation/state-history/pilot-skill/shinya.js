// @flow
import type {PilotSkill, RecoverBatterySkill} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {ShinyaHUD} from "../../../view/hud/pilot-objects/shinya";
import {dolly, toInitial, track} from "../../td-camera";
import type {PilotSkillAnimationParamX} from "./animation-param";

/**
 * パイロットスキル シンヤ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type ShinyaAnimationParamX<SKILL: PilotSkill> = PilotSkillAnimationParamX<SKILL, ShinyaHUD>;

/**
 * パイロットスキル シンヤ アニメーションパラメータ
 */
export type ShinyaAnimationParam = ShinyaAnimationParamX<PilotSkill>;

/**
 * シンヤ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function shinyaAnimation(param: ShinyaAnimationParam): Animate {
  if (param.skill.type === 'RecoverBatterySkill') {
    const skill: RecoverBatterySkill = param.skill;
    return shinyaRecoverBattery({...param, skill});
  }

  return empty();
}

/**
 * シンヤ バッテリー回復 アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function shinyaRecoverBattery(param: ShinyaAnimationParamX<RecoverBatterySkill>): Animate {
  return  all(
    param.pilot.cutIn.show(),
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-40', 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(all(
      param.invokerHUD.gauge.battery(param.invokerState.armdozer.battery),
      param.invokerTD.recoverBattery.popUp(param.skill.recoverBattery),
    ))
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(200));
}
