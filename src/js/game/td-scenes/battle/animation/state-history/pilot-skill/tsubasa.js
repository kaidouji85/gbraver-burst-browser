// @flow

import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";
import type {PilotSkill} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {dolly, toInitial, track} from "../../td-camera";
import {TsubasaHUD} from "../../../view/hud/pilot-objects/tsubasa";
import type {BatteryEnchantmentSkill} from "gbraver-burst-core/lib/player/pilot";

/**
 * パイロットスキル ツバサ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type TsubasaAnimationParamX<SKILL: PilotSkill> = PilotSkillAnimationParamX<SKILL, TsubasaHUD>;

/**
 * パイロットスキル ツバサ アニメーションパラメータ
 */
export type TsubasaAnimationParam = TsubasaAnimationParamX<PilotSkill>;

/**
 * ツバサアニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castTsubasaAnimationParam(origin: PilotSkillAnimationParam): ?TsubasaAnimationParam {
  if (origin.pilot instanceof TsubasaHUD) {
    const tsubasa: TsubasaHUD = origin.pilot;
    return ((origin: any): PilotSkillAnimationParamX<typeof origin.skill, typeof tsubasa>);
  }

  return null;
}

/**
 * ツバサ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function tsubasaAnimation(param: TsubasaAnimationParam): Animate {
  if (param.skill.type === 'BatteryEnchantmentSkill') {
    const recoverBatterySKill: BatteryEnchantmentSkill = param.skill;
    const castParam = ((param: any): TsubasaAnimationParamX<typeof recoverBatterySKill>);
    return tsubasaBatteryEnchantment(castParam);
  }

  return empty();
}

/**
 * ツバサ バッテリー回復 アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
function tsubasaBatteryEnchantment(param: TsubasaAnimationParamX<BatteryEnchantmentSkill>): Animate {
  return  all(
    param.pilot.cutIn.show(),
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-60', 500),
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
    .chain(param.invokerTD.armdozerEffects.batteryEnchantment.popUp())
    .chain(delay(500))
    .chain(all(
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(500));
}
