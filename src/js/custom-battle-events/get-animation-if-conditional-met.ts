import { Animate } from "../animation/animate";
import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";

/**
 * 再生条件とアニメーションのペア
 * @param props イベントプロパティ
 * @return 再生するアニメーション、再生条件を満たさない場合はnull
 */
export type ConditionalAnimation<X extends CustomStateAnimation> = (props: X) => Animate | null;

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
    if (result !== null) {
      return result;
    }
  }
  return null;
}