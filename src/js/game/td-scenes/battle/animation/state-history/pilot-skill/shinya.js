// @flow

import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";
import type {PilotSkill, RecoverBatterySkill} from "gbraver-burst-core";
import {ShinyaHUD} from "../../../view/hud/pilot-objects/shinya";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";

/**
 * パイロットスキル シンヤ アニメーションパラメータ
 * @type SKILL パイロットスキル
 */
export type ShinyaAnimationParamX<SKILL: PilotSkill> = PilotSkillAnimationParamX<SKILL, ShinyaHUD>;

/**
 * パイロットスキル シンヤ アニメーションパラメータ
 */
export type ShinyaAnimationParam = ShinyaAnimationParamX<PilotSkill>;

/**
 * パイロットスキル シンヤ アニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castShinyaAnimationParam(origin: PilotSkillAnimationParam): ?ShinyaAnimationParam {
  if (origin.pilot instanceof ShinyaHUD) {
    const shinya: ShinyaHUD = origin.pilot;
    return ((origin: any): PilotSkillAnimationParamX<typeof origin.skill, typeof shinya>);
  }

  return null;
}

/**
 * シンヤ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function shinyaAnimation(param: ShinyaAnimationParam): Animate {
  if (param.skill.type === 'RecoverBatterySkill') {
    const recoverBatterySKill: RecoverBatterySkill = param.skill;
    const castParam = ((param: any): ShinyaAnimationParamX<typeof recoverBatterySKill>);
    return shinyaRecoverBattery(castParam);
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
    attentionArmDozer(param.tdCamera, param.invokerSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(2000))
    .chain(all(
      param.pilot.cutIn.hidden(),
      param.hudObjects.rearmostFader.opacity(0, 300))
    )
    .chain(delay(1000))
    .chain(all(
      param.invokerHUD.gauge.battery(param.invokerState.armdozer.battery),
      param.invokerTD.recoverBattery.popUp(param.skill.recoverBattery)
    ))
    .chain(delay(500))
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(500));
}
