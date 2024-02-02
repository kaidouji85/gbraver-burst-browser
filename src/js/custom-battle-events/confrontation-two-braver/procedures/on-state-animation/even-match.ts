import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { yuuyaShout1WhenEvenMatch } from "../../animation/yuuya-shout1-when-even-match";
import { yuuyaShout2WhenEvenMatch } from "../../animation/yuuya-shout2-when-even-match";
import { ConfrontationTwoBraverProps } from "../../props";

/** イーブンマッチ カスタムステートアニメーション */
export const evenMatch: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "EvenMatch" &&
      isEnemyBurstActivated(props)
      ? yuuyaShout1WhenEvenMatch(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "EvenMatch" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaShout2WhenEvenMatch(props)
      : null;
  },
];
