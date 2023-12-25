import { Animate } from "../animation/animate";
import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";

/** アニメーションを再生する */
export type ShouldPlayAnimation = {
  shouldPlay: true;
  /** 再生するアニメーション */
  animate: Animate;
};

/** アニメーションを再生しない */
export type ShouldNotPlayAnimation = {
  shouldPlay: false;
};

/** アニメーションを再生するか否かの結果 */
export type ConditionalResult = ShouldPlayAnimation | ShouldNotPlayAnimation;

/**
 * 再生条件とアニメーションのペア
 * @param props イベントプロパティ
 * @return 再生条件とアニメーション
 */
export type ConditionalAnimation<X extends CustomStateAnimation> = (props: X) => ConditionalResult;

/**
 * 再生条件を満たしたアニメーションを1つだけ再生する
 * @param props イベントプロパティ
 * @param animations 再生条件とアニメーションのリスト
 * @return 再生するアニメーション、再生条件を満たすアニメーションがない場合はnull
 */
export function getAnimationIfConditionMet<X extends CustomStateAnimation>(
  props: X,
  animations: ConditionalAnimation<X>[]
): Animate | null {
  for (const animation of animations) {
    const result = animation(props);
    if (result.shouldPlay) {
      return result.animate;
    }
  }
  return null;
}