import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../../animation/yuuya-cry1-when-shinya-has-advantage";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../../animation/yuuya-cry2-when-shinya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ有利 カスタムステートアニメーション */
export const shinyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "ShinyaHasAdvantage" &&
      isEnemyBurstActivated(props)
      ? yuuyaCry1WhenShinyaHasAdvantage(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "ShinyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaCry2WhenShinyaHasAdvantage(props)
      : null;
  },
];
