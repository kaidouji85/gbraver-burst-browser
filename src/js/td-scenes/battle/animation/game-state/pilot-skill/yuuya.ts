import type { BatteryBoostSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { YuuyaHUD } from "../../../view/hud/pilot-objects/yuuya";
import { dolly, toInitial, track } from "../../td-camera";
import type { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ユウヤ アニメーションパラメータ（型指定あり）
 * @template SKILL パイロットスキル
 */
export type YuuyaAnimationParamX<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, YuuyaHUD>;

/** パイロットスキル ユウヤ アニメーションパラメータ */
export type YuuyaAnimationParam = YuuyaAnimationParamX<PilotSkill>;

/**
 * ユウヤ パイロットスキルアニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function yuuyaAnimation(param: YuuyaAnimationParam): Animate {
  if (param.skill.type === "BatteryBoostSkill") {
    const skill: BatteryBoostSkill = param.skill;
    return yuuyaBatteryBoost({ ...param, skill });
  }

  return empty();
}

/**
 * ユウヤ バッテリーブースト アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function yuuyaBatteryBoost(
  param: YuuyaAnimationParamX<BatteryBoostSkill>,
): Animate {
  return all(
    param.pilot.cutIn.show(),
    track(param.tdCamera, param.invokerSprite.getObject3D().position.x, 500),
    dolly(param.tdCamera, "-40", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.isActivePlayer
      ? param.invokerSprite.endActive()
      : param.anotherSprite.endActive(),
  )
    .chain(delay(800))
    .chain(param.pilot.cutIn.hidden())
    .chain(delay(200))
    .chain(
      all(
        param.invokerHUD.gauge.battery(param.invokerState.armdozer.battery),
        param.invokerTD.recoverBattery.popUp(param.skill.recoverBattery),
      ),
    )
    .chain(
      all(
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}
