import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay } from "../../../../../animation/delay";
import type { ReflectAnimationParam } from "./animation-param";

/**
 * 電撃バリア
 * @param param パラメータ
 * @returns アニメーション
 */
export function lightning(param: ReflectAnimationParam): Animate {
  return all(
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100).chain(
      all(
        param.damaged.sprite
          .knockBack()
          .chain(delay(800))
          .chain(param.damaged.sprite.knockBackToStand()),
        param.damaged.td.damageIndicator.popUp(param.effect.damage),
        param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
      ),
    ),
  );
}

/**
 * 電撃バリア 死亡
 * @param param パラメータ
 * @returns アニメーション
 */
export function deathLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.reflecting.hud.resultIndicator
      .slideIn()
      .chain(delay(700))
      .chain(param.reflecting.hud.resultIndicator.moveToEdge()),
    delay(700).chain(param.damaged.hud.resultIndicator.hidden()),
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100).chain(
      all(
        param.damaged.sprite.down(),
        param.damaged.td.damageIndicator.popUp(param.effect.damage),
        param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
      ),
    ),
  );
}
