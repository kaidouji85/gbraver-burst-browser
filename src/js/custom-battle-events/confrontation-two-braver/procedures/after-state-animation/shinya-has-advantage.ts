import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ有利 カスタムステートアニメ終了 */
export const shinyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimationProps & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.eventState.chapter.type === "ShinyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null;
  },
];
