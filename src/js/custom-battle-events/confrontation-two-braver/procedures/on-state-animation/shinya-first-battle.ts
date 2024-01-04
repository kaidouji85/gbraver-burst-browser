import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaCryWhenFirstBattle } from "../../animation/shinya-cry-when-first-battle";
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

    return playerBattleCount(props.stateHistory, player.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
      ? shinyaCryWhenFirstBattle(props)
      : null;
  },
];
