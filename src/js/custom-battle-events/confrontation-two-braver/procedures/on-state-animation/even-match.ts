import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaCry1WhenEvenMatch } from "../../animation/yuuya-cry1-when-even-match";
import { yuuyaCry2WhenEvenMatch } from "../../animation/yuuya-cry2-when-even-match";
import { ConfrontationTwoBraverProps } from "../../props";

/**
 * イーブンマッチ カスタムステートアニメーション
 */
export const evanMatch: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const isEnemyBurstActivated =
      props.currentState.effect.name === "BurstEffect" &&
      props.currentState.effect.burstPlayer !== props.playerId;
    return props.state.chapter.type === "EvenMatch" && isEnemyBurstActivated
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
