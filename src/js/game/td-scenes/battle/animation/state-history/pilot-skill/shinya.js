// @flow

import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";
import type {PilotSkill} from "gbraver-burst-core";
import {ShinyaHUD} from "../../../view/hud/pilot-objects/shinya";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";

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
  return empty();
}
