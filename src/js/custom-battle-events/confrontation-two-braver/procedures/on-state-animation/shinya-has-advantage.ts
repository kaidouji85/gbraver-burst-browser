import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaCry1WhenShinyaHasAdvantage } from "../../animation/yuuya-cry1-when-shinya-has-advantage";
import { yuuyaCry2WhenShinyaHasAdvantage } from "../../animation/yuuya-cry2-when-shinya-has-advantage";
import { ConfrontationTwoBraverProps } from "../../props";

/**
 * シンヤ有利 カスタムステートアニメーション
 */
export const shinyaHasAdvantage: ConditionalAnimation<CustomStateAnimation & ConfrontationTwoBraverProps>[] = [
  (props) => {
    const isEnemyBurstActivated =
      props.currentState.effect.name === "BurstEffect" &&
      props.currentState.effect.burstPlayer !== props.playerId;
    if (
      props.state.chapter.type === "ShinyaHasAdvantage" &&
      isEnemyBurstActivated
    ) {
      return yuuyaCry1WhenShinyaHasAdvantage(props);
    }
    return null;
  },
  (props) => {
    if (
      props.state.chapter.type === "ShinyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
    ) {
      return yuuyaCry2WhenShinyaHasAdvantage(props);
    }
    return null;
  }
];
