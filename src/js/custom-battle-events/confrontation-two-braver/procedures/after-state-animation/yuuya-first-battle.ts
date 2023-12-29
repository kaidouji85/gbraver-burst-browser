import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ ファーストバトル カスタムステートアニメ終了 */
export const yuuyaFirstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    return playerBattleCount(props.stateHistory, enemy.playerId) === 1 &&
      props.currentState.effect.name === "Battle" &&
      props.currentState.effect.attacker === enemy.playerId
      ? process(() => {
          props.view.dom.enemyCryMessageWindow.visible(false);
        })
      : null;
  },
];
