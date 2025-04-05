import { AbortManagerContainer } from "../../abort-controller/abort-manager-container";
import { Animate } from "../../animation/animate";
import { AnimationTimeScaleContainer } from "./animation-time-scale-container";

/** 戦闘シーンプロパティから本関数で利用するものをピックアップしたもの */
type Props = Readonly<AnimationTimeScaleContainer> &
  Readonly<AbortManagerContainer>;

/**
 * 戦闘シーン専用のアニメーション再生関数を生成する
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション再生関数
 */
export const createAnimationPlay = (props: Props) => (animate: Animate) => {
  const { signal } = props.abort.getAbortController();
  return animate.timeScale(props.animationTimeScale).play({ signal });
};
