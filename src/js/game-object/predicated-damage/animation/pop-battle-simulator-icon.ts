import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { PredicatedDamageAnimationProps } from "./animation-props";

/**
 * バトルシミュレーターアイコンをポップさせる
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function popBattleSimulatorIcon(props: PredicatedDamageAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.battleSimulatorIconScale = 1;
    se.play(sounds.changeValue);
  })
    .chain(tween(model, (t) => t.to({ battleSimulatorIconScale: 1.18 }, 80)))
    .chain(tween(model, (t) => t.to({ battleSimulatorIconScale: 1 }, 80)));
}
