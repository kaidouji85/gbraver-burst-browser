import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { getPlayerBattleCount } from "../../../get-battle-count";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { isEnemyPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { tsubasaBurstShout } from "../../animation/tsubasa-burst-shout";
import { tsubasaFinishBlowShout } from "../../animation/tsubasa-finish-blow-shout";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { tsubasaVictoryDeclaration } from "../../animation/tsubasa-victory-declaration";
import { PilotSkillTutorial01Props } from "../../props";

/** ツバサ先輩 叫び */
export const tsubasaShout: ConditionalAnimation<
  CustomStateAnimationProps & PilotSkillTutorial01Props
>[] = [
  (props) =>
    isEnemyPilotSkillActivatedFromCurrentState(props)
      ? tsubasaVictoryDeclaration(props)
      : null,
  (props) =>
    isEnemyBurstActivatedFromCurrentState(props)
      ? tsubasaBurstShout(props)
      : null,
  (props) => {
    const players = separatePlayersFromCurrentState(props);
    if (!players) {
      return null;
    }

    const { enemy } = players;
    return getPlayerBattleCount(props.stateHistory, enemy.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId
      ? tsubasaFirstAttackShout(props)
      : null;
  },
  (props) => {
    const players = separatePlayersFromCurrentState(props);
    if (!players) {
      return null;
    }

    const { enemy } = players;
    const hasEnemyDeliveredFinishBlow = hasDeliveredFinishBlow(
      props.stateHistory,
      enemy.playerId,
    );
    return props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId &&
      hasEnemyDeliveredFinishBlow
      ? tsubasaFinishBlowShout(props)
      : null;
  },
];
