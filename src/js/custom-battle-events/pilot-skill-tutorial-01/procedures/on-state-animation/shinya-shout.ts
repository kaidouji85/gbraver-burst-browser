import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaFirstAttackShout1 } from "../../animation/shinya-first-attack-shout1";
import { shinyaFirstAttackShout2 } from "../../animation/shinya-first-attack-shout2";
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
    if (playerBattleCount(props.stateHistory, player.playerId) !== 1) {
      return null;
    }

    if (
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
    ) {
      return shinyaFirstAttackShout1(props);
    }

    if (
      props.currentState.effect.name === "Battle" &&
      props.currentState.effect.attacker === player.playerId
    ) {
      return shinyaFirstAttackShout2(props);
    }

    return null;
  },
];
