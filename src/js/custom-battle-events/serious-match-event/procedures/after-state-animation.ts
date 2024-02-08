import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";

/**
 * ステートアニメ終了後に呼ばれるアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  return empty();
}
