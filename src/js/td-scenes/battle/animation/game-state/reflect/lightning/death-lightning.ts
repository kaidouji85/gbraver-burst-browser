import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import { onStart } from "../../../../../../animation/on-start";
import { stop } from "../../../../../../bgm/bgm-operators";
import { shakeY } from "../../../td-camera";
import { ReflectAnimationParam } from "../animation-param";

/**
 * 電撃バリア 死亡
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export const deathLightning = (param: ReflectAnimationParam): Animate =>
  all(
    param.damaged.td.hitMark.lightning.popUp(),
    param.tdObjects.skyBrightness.brightness(0.3, 100),
    param.tdObjects.illumination.intensity(0.3, 100),
    onStart(() => param.bgm.do(stop)),
    delay(100).chain(
      all(
        all(param.damaged.sprite.knockBack(), delay(800)).chain(
          all(
            param.damaged.sprite.down(),
            delay(param.damaged.sprite.downImpactDelay).chain(
              all(
                onStart(() => param.se.play(param.bigExplosion)),
                shakeY(param.tdCamera),
                param.tdObjects.skyBrightness.brightness(1, 500),
                param.tdObjects.illumination.intensity(1, 500),
              ),
            ),
          ),
        ),
        param.damaged.td.damageIndicator.popUp(param.effect.damage),
        param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
      ),
    ),
  ).chain(delay(200));
