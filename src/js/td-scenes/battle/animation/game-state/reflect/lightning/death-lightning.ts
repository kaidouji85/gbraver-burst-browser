import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import { ReflectAnimationParam } from "../animation-param";

/**
 * 電撃バリア 死亡
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export const deathLightning = (param: ReflectAnimationParam): Animate =>
  all(
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
