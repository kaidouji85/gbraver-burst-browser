import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import { ReflectAnimationParam } from "../animation-param";

/**
 * 電撃バリア 通常
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export const normalLightning = (param: ReflectAnimationParam): Animate =>
  all(
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
