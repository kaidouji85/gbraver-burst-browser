import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { ContinuousAttackModel } from "../model/continuous-attack-model";
import { ContinuousAttackSounds } from "../sounds/continuous-attack-sounds";

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(model: ContinuousAttackModel, sounds: ContinuousAttackSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.2;
    sounds.benefitEffect.play();
  }).chain(tween(model, t => t.to({
    opacity: 1,
    scale: 1
  }, 400))).chain(delay(600)).chain(tween(model, t => t.to({
    opacity: 0,
    scale: 1.1
  }, 200)));
}