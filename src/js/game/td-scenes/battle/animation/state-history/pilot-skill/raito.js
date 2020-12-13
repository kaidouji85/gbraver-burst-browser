// @flow


import type {PilotSkill} from "gbraver-burst-core";
import type {PilotSkillAnimationParam, PilotSkillAnimationParamX} from "./animation-param";
import {RaitoHUD} from "../../../view/hud/pilot-objects/raito";

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
