//@flow
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
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100).chain(all(
      param.damaged.sprite.knockBack(),
      param.damaged.td.damageIndicator.popUp(param.effect.damage),
      param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
    )))
    .chain(param.damaged.sprite.knockBackToStand())
    .chain(delay(500));
}

/**
 * 電撃バリア 死亡
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function deathLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.reflecting.hud.resultIndicator.slideIn()
      .chain(delay(500))
      .chain(param.reflecting.hud.resultIndicator.moveToEdge()),
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100).chain(all(
      param.damaged.sprite.down(),
      param.damaged.td.damageIndicator.popUp(param.effect.damage),
      param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
    ))
  );
}