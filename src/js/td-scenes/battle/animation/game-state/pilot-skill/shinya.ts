import { PilotSkill, RecoverBatterySkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { ShinyaHUD } from "../../../view/hud/pilot-objects/shinya";
import { dolly, toInitial, track } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル シンヤ アニメーションパラメータ
 * @template SKILL パイロットスキル
 */
export type ShinyaAnimationParam<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, ShinyaHUD>;

/** イン アニメーション時間 */
const inDuration = 400;
/** アウト アニメーション時間 */
const outDuration = 400;

/**
 * シンヤ バッテリー回復 アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function shinyaRecoverBattery(
  param: ShinyaAnimationParam<RecoverBatterySkill>,
): Animate {
  return all(
    param.pilot.cutIn.show(),
    track(
      param.tdCamera,
      param.invokerSprite.getObject3D().position.x,
      inDuration,
    ),
    dolly(param.tdCamera, "-20", inDuration),
    param.tdObjects.skyBrightness.brightness(0.2, inDuration),
    param.tdObjects.illumination.intensity(0.2, inDuration),
    param.attackerTDArmdozer.sprite().endActive(),
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
        toInitial(param.tdCamera, outDuration),
        param.tdObjects.skyBrightness.brightness(1, outDuration),
        param.tdObjects.illumination.intensity(1, outDuration),
      ),
    )
    .chain(delay(200));
}

/**
 * シンヤ パイロットスキル アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function shinyaAnimation(
  param: ShinyaAnimationParam<PilotSkill>,
): Animate {
  if (param.skill.type === "RecoverBatterySkill") {
    const skill: RecoverBatterySkill = param.skill;
    return shinyaRecoverBattery({ ...param, skill });
  }

  return empty();
}
