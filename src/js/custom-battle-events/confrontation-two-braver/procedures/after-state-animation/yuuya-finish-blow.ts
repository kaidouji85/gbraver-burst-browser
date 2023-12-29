import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ トドメの一撃 カスタムステートアニメ終了 */
export const yuuyaFinishBlow: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    return props.currentState.effect.name === "Battle" &&
      props.currentState.effect.attacker === enemy.playerId &&
      props.currentState.effect.isDeath
      ? process(() => {
          props.view.dom.enemyCryMessageWindow.visible(false);
        })
      : null;
  },
];
