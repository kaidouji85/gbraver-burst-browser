import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { yuuyaBurstWhenShinyaAdvantage } from "../animation/yuuya-burst-when-shinya-advantage";
import { hasYuuyaActivatedBurst } from "./has-yuuya-activated-burst";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (hasYuuyaActivatedBurst(props)) {
    return yuuyaBurstWhenShinyaAdvantage(props);
  }

  return empty();
}
