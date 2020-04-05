import type {ReflectAnimationParam} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {all} from "../../../../../../animation/all";
import {delay} from "../../../../../../animation/delay";

/**
 * 電撃バリア
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function lightning(param: ReflectAnimationParam): Animate {
  return all(
    param.tdPlayer.hitMark.lightning.popUp(),
    delay(100).chain(all(
      param.sprite.knockBack(),
      param.tdPlayer.damageIndicator.popUp(param.effect.damage),
      param.tdPlayer.gauge.hp(param.state.armdozer.hp),
    ))
  ).chain(delay(500)
  ).chain(param.sprite.knockBackToStand()
  ).chain(delay(500));
}

/**
 * 電撃バリア 死亡
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function deathLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.tdPlayer.hitMark.lightning.popUp(),
    delay(100).chain(all(
      param.sprite.down(),
      param.tdPlayer.damageIndicator.popUp(param.effect.damage),
      param.tdPlayer.gauge.hp(param.state.armdozer.hp),
    ))
  ).chain(delay(500));
}