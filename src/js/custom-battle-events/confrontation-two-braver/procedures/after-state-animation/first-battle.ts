import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { battleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";

/** 最初の戦闘 カスタムステートアニメ終了 */
export const firstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return battleCount(props.stateHistory) === 1 &&
      props.currentState.effect.name === "Battle"
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null;
  },
];
