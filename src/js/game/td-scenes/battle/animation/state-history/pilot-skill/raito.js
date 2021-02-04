// @flow


import type {PilotSkill, DamageDecreaseSkill} from "gbraver-burst-core";
import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";
import {RaitoHUD} from "../../../view/hud/pilot-objects/raito";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";

/**
 * パイロットスキル ライト アニメーションパラメータ
 * @type SKILL パイロットスキル
 */
export type RaitoAnimationParamX<SKILL: PilotSkill> = PilotSkillAnimationParamX<SKILL, RaitoHUD>;

/**
 * パイロットスキル ライト アニメーションパラメータ
 */
export type RaitoAnimationParam = RaitoAnimationParamX<PilotSkill>;

/**
 * パイロットスキル ライト アニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castRaitoAnimationParam(origin: PilotSkillAnimationParam): ?RaitoAnimationParam {
  if (origin.pilot instanceof RaitoHUD) {
    const raito: RaitoHUD = origin.pilot;
    return ((origin: any): PilotSkillAnimationParamX<typeof origin.skill, typeof raito>);
  }

  return null;
}

/**
 * ライト パイロットスキルアニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function raitoAnimation(param: RaitoAnimationParam): Animate {
  if (param.skill.type === 'DamageDecreaseSkill') {
    const castedSkill: DamageDecreaseSkill = param.skill;
    const castedParam = ((param: any): RaitoAnimationParamX<typeof castedSkill>);
    return raitoDamageDecrease(castedParam);
  }

  return empty();
}

/**
 * ライト ダメージ減少 アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function raitoDamageDecrease(param: RaitoAnimationParamX<DamageDecreaseSkill>): Animate {
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
    .chain(delay(500))
    .chain(param.invokerTD.armdozerEffects.damageDecrease.popUp())
    .chain(delay(500))
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(500));
}