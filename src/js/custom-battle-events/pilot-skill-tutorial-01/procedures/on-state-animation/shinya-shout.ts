import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaFirstAttackShout } from "../../animation/shinya-first-attack-shout";
import { PilotSkillTutorial01Props } from "../../props";

/** シンヤ 叫び */
export const shinyaShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial01Props
>[] = [
  (props) => {
    const players = separatePlayersFromCurrentState(props);
    if (!players) {
      return null;
    }

    const { player } = players;
    return playerBattleCount(props.stateHistory, player.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
      ? shinyaFirstAttackShout(props)
      : null;
  },
];
