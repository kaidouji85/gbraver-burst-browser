import { Animate } from "../../animation/animate";
import { AnimationTimeScaleContainer } from "./animation-time-scale-container";

/**
 * 戦闘シーン専用のアニメーション再生関数を生成する
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション再生関数
 */
export const createAnimationPlay =
  (props: AnimationTimeScaleContainer) => (animate: Animate) =>
    animate.timeScale(props.animationTimeScale).play();
