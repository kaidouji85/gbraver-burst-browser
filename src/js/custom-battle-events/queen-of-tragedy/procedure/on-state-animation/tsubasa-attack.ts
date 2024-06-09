import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 攻撃 */
export const tsubasaAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    const { stateHistory, currentState } = props;
    const enemyBattleCount = playerBattleCount(stateHistory, enemy.playerId);
    return currentState.effect.name === "BatteryDeclaration" &&
      currentState.activePlayerId === enemy.playerId &&
      enemyBattleCount === 1
      ? tsubasaFirstAttackShout(props)
      : null;
  },
];
