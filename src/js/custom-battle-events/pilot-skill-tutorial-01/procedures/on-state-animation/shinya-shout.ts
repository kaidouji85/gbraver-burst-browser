import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { battleCount, playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaBurstShout } from "../../animation/shinya-burst-shout";
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
    if (!isPlayerPilotSkillActivatedFromCurrentState(props)) {
      return null;
    }

    if (battleCount(props.stateHistory) === 0) {
      return shinyaPilotSkillShoutWhenHeFullBattery(props);
    }

    return props.currentState.activePlayerId === props.playerId
      ? shinyaPilotSkillShoutWhenHeAttack(props)
      : shinyaPilotSkillShoutWhenHeDefense(props);
  },
  (props) =>
    isPlayerBurstActivatedFromCurrentState(props)
      ? shinyaBurstShout(props)
      : null,
];
