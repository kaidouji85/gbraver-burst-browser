import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { yuuyaShout1WhenShinyaHasAdvantage } from "../../animation/yuuya-shout1-when-shinya-has-advantage";
import { yuuyaShout2WhenShinyaHasAdvantage } from "../../animation/yuuya-shout2-when-shinya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ有利 カスタムステートアニメーション */
export const shinyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimationProps & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.eventState.chapter.type === "ShinyaHasAdvantage" &&
      isEnemyBurstActivatedFromCurrentState(props)
      ? yuuyaShout1WhenShinyaHasAdvantage(props)
      : null;
  },
  (props) => {
    return props.eventState.chapter.type === "ShinyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaShout2WhenShinyaHasAdvantage(props)
      : null;
  },
];
