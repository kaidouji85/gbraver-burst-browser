import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import { ReflectAnimationParam } from "../animation-param";

/**
 * 電撃バリア 引き分け
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export const drawLightning = (param: ReflectAnimationParam): Animate =>
  all(
    param.drawIndicator
      .slideIn()
      .chain(delay(700))
      .chain(param.drawIndicator.moveToEdge()),
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
