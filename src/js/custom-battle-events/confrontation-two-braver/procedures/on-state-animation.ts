import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { yuuyaBatteryDeclarationCryWhenShinyaHasAdvantage } from "../animation/yuuya-battery-declaration-cry-when-shinya-has-advantage";
import { yuuyaBurstCryWhenShinyaHasAdvantage } from "../animation/yuuya-burst-cry-when-shinya-has-advantage";
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
    return yuuyaBurstCryWhenShinyaHasAdvantage(props);
  }

  if (turn === 3 && props.currentState.effect.name === "BatteryDeclaration") {
    return yuuyaBatteryDeclarationCryWhenShinyaHasAdvantage(props);
  }

  return empty();
}
