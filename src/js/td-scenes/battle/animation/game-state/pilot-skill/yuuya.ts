import { BatteryBoostSkill, PilotSkill } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { YuuyaHUD } from "../../../view/hud/pilot-objects/yuuya";
import { toInitial } from "../../td-camera";
import { PilotSkillAnimationParamX } from "./animation-param";

/**
 * パイロットスキル ユウヤ アニメーションパラメータ（型指定あり）
 * @template SKILL パイロットスキル
 */
export type YuuyaAnimationParam<SKILL extends PilotSkill> =
  PilotSkillAnimationParamX<SKILL, YuuyaHUD>;

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
  param: YuuyaAnimationParam<PilotSkill>,
): Animate {
  const x = param.invokerSprite.getObject3D().position.x;
  const z = "-20";
  return all(
    param.tdCamera.move({ x, z }, inDuration),
    param.tdCamera.lookAt({ x, z }, inDuration),
  );
}

/**
 * ユウヤ バッテリーブースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function yuuyaBatteryBoost(
  param: YuuyaAnimationParam<BatteryBoostSkill>,
): Animate {
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
 * ユウヤ パイロットスキルアニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function yuuyaAnimation(
  param: YuuyaAnimationParam<PilotSkill>,
): Animate {
  if (param.skill.type === "BatteryBoostSkill") {
    const skill: BatteryBoostSkill = param.skill;
    return yuuyaBatteryBoost({ ...param, skill });
  }

  return empty();
}
