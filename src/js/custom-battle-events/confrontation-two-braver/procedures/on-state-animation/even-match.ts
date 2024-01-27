import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { yuuyaCry1WhenEvenMatch } from "../../animation/yuuya-cry1-when-even-match";
import { yuuyaCry2WhenEvenMatch } from "../../animation/yuuya-cry2-when-even-match";
import { ConfrontationTwoBraverProps } from "../../props";

/** イーブンマッチ カスタムステートアニメーション */
export const evenMatch: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "EvenMatch" &&
      isEnemyBurstActivated(props)
      ? yuuyaCry1WhenEvenMatch(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "EvenMatch" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaCry2WhenEvenMatch(props)
      : null;
  },
];
