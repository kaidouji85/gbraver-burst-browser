import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { getPlayerBattleCount } from "../../../get-battle-count";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaShoutWhenFirstBattle } from "../../animation/shinya-shout-when-first-battle";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ ファーストバトル */
export const shinyaFirstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const player = separatePlayersFromCurrentState(props)?.player;
    if (!player) {
      return null;
    }

    return getPlayerBattleCount(props.stateHistory, player.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
      ? shinyaShoutWhenFirstBattle(props)
      : null;
  },
];
