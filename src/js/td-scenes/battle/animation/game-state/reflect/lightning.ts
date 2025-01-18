import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { ReflectAnimationParam } from "./animation-param";

/**
 * 電撃バリア 通常
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function normalLightning(param: ReflectAnimationParam): Animate {
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
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function deathLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.reflecting.hud.resultIndicator
      .slideIn()
      .chain(delay(700))
      .chain(param.reflecting.hud.resultIndicator.moveToEdge()),
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

/**
 * 電撃バリア 引き分け
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function drawLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.drawIndicator
      .slideIn()
      .chain(delay(700))
      .chain(param.drawIndicator.moveToEdge()),
    delay(700).chain(param.damaged.hud.resultIndicator.hidden()),
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100).chain(
      all(
        param.damaged.sprite.knockBack(),
        param.damaged.td.damageIndicator.popUp(param.effect.damage),
        param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
      ),
    ),
  );
}

/**
 * 電撃バリア
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function lightning(param: ReflectAnimationParam): Animate {
  let animation = empty();
  const { effect, reflecting } = param;
  if (effect.isDeath && reflecting.state.armdozer.hp <= 0) {
    animation = drawLightning(param);
  } else if (effect.isDeath) {
    animation = deathLightning(param);
  } else {
    animation = normalLightning(param);
  }
  return animation;
}
