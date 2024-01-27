import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { yuuyaCry1WhenYuuyaHasAdvantage } from "../../animation/yuuya-cry1-when-yuuya-has-advantage";
import { yuuyaCry2WhenYuuyaHasAdvantage } from "../../animation/yuuya-cry2-when-yuuya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ有利 カスタムステートアニメーション */
export const yuuyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaHasAdvantage" &&
      isEnemyBurstActivated(props)
      ? yuuyaCry1WhenYuuyaHasAdvantage(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "YuuyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaCry2WhenYuuyaHasAdvantage(props)
      : null;
  },
];
