import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { yuuyaShout1WhenYuuyaHasAdvantage } from "../../animation/yuuya-shout1-when-yuuya-has-advantage";
import { yuuyaShout2WhenYuuyaHasAdvantage } from "../../animation/yuuya-shout2-when-yuuya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ有利 カスタムステートアニメーション */
export const yuuyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaHasAdvantage" &&
      isEnemyBurstActivatedFromCurrentState(props)
      ? yuuyaShout1WhenYuuyaHasAdvantage(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "YuuyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaShout2WhenYuuyaHasAdvantage(props)
      : null;
  },
];
