import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../animation/yuuya-cry1-when-shinya-has-advantage";
import { yuuyaCry1WhenYuuyaHasAdvantage } from "../animation/yuuya-cry1-when-yuuya-has-advantage";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../animation/yuuya-cry2-when-shinya-has-advantage";
import { yuuyaCry2WhenYuuyaHasAdvantage } from "../animation/yuuya-cry2-when-yuuya-has-advantage";
import { ConfrontationTwoBraverProps } from "../props";

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
    props.currentState.effect.name === "BurstEffect" &&
    props.currentState.effect.burstPlayer !== props.playerId
  ) {
    return yuuyaCry1WhenShinyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenShinyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "YuuyaHasAdvantage" &&
    props.currentState.effect.name === "BurstEffect" &&
    props.currentState.effect.burstPlayer !== props.playerId
  ) {
    return yuuyaCry1WhenYuuyaHasAdvantage(props);
  }

  if (
    props.state.chapter.type === "YuuyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return yuuyaCry2WhenYuuyaHasAdvantage(props);
  }

  return empty();
}
