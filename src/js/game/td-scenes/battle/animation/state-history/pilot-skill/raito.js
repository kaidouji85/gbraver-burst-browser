// @flow
import type {DamageDecreaseSkill, PilotSkill} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {RaitoHUD} from "../../../view/hud/pilot-objects/raito";
import {dolly, toInitial, track} from "../../td-camera";
import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";

/**
 * パイロットスキル ライト アニメーションパラメータ
 * @template SKILL パイロットスキル
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
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-40', 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(param.invokerTD.armdozerEffects.damageDecrease.popUp())
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(200));
}