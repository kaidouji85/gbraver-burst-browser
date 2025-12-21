import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import { onStart } from "../../../../../../animation/on-start";
import { changeGainVolume } from "../../../../../../bgm/bgm-operators";
import { shakeY } from "../../../td-camera";
import { ReflectAnimationParam } from "../animation-param";

/**
 * 電撃バリア 死亡
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export const deathLightning = (param: ReflectAnimationParam): Animate =>
  all(
    onStart(() => param.bgm.do(changeGainVolume(0.5))),
    param.damaged.td.hitMark.lightning.popUp(),
    delay(100)
      .chain(
        all(
          param.damaged.sprite.down(),
          delay(param.damaged.sprite.downImpactDelay).chain(
            all(
              onStart(() => param.se.play(param.bigExplosion)),
              shakeY(param.tdCamera),
            ),
          ),
          param.damaged.td.damageIndicator.popUp(param.effect.damage),
          param.damaged.hud.gauge.hp(param.damaged.state.armdozer.hp),
        ),
      )
      .chain(onStart(() => param.bgm.do(changeGainVolume(1)))),
  );
