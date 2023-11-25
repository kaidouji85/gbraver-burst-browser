import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../animation/yuuya-cry1-when-shinya-has-advantage";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../animation/yuuya-cry2-when-shinya-has-advantage";
import { ConfrontationTwoBraverProps } from "../props";
import { hasYuuyaActivatedBurst } from "./has-yuuya-activated-burst";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
): Animate {
  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    hasYuuyaActivatedBurst(props)
  ) {
    return yuuyaCry1WhenShinyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenShinyaHasAdvantage(props);
  }

  return empty();
}
