import { process } from "../../../../animation/process";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ有利 カスタムステートアニメ終了 */
export const yuuyaHasAdvantage: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaHasAdvantage" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? process(() => {
          props.view.dom.enemyCryMessageWindow.visible(false);
        })
      : null;
  },
];
