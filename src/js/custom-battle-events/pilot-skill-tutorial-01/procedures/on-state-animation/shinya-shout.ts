import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaFirstAttackShout } from "../../animation/shinya-first-attack-shout";
import { shinyaPilotSkillShoutWhenHeAttack } from "../../animation/shinya-pilot-skill-shout-when-he-attack";
import { shinyaPilotSkillShoutWhenHeDefense } from "../../animation/shinya-pilot-skill-shout-when-he-defense";
import { shinyaPilotSkillShoutWhenHeFullBattery } from "../../animation/shinya-pilot-skill-shout-when-he-full-battery";
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
  (props) => {
    const players = separatePlayersFromCurrentState(props);
    if (!isPlayerPilotSkillActivated(props) || !players) {
      return null;
    }

    const { player } = players;
    const isPlayerFullBattery =
      player.armdozer.battery === player.armdozer.maxBattery;
    if (isPlayerFullBattery) {
      return shinyaPilotSkillShoutWhenHeFullBattery(props);
    }

    return props.currentState.activePlayerId === props.playerId
      ? shinyaPilotSkillShoutWhenHeAttack(props)
      : shinyaPilotSkillShoutWhenHeDefense(props);
  },
];
