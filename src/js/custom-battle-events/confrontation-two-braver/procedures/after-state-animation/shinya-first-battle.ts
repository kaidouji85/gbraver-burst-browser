import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ ファーストバトル カスタムステートアニメ終了 */
export const shinyaFirstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const player = separatePlayersFromCurrentState(props)?.player;
    if (!player) {
      return null;
    }

    return playerBattleCount(props.stateHistory, player.playerId) === 1 &&
      props.currentState.effect.name === "Battle" &&
      props.currentState.effect.attacker === player.playerId
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null;
  },
];
