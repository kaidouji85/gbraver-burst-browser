import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../animation/yuuya-cry2-when-shinya-has-advantage";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../animation/yuuya-cry1-when-shinya-has-advantage";
import { hasYuuyaActivatedBurst } from "./has-yuuya-activated-burst";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  const turn = turnCount(props.stateHistory);
  if (turn === 3 && hasYuuyaActivatedBurst(props)) {
    return yuuyaCry1WhenShinyaHasAdvantage(props);
  }

  if (turn === 3 && props.currentState.effect.name === "BatteryDeclaration") {
    return yuuyaCry2WhenShinyaHasAdvantage(props);
  }

  return empty();
}
