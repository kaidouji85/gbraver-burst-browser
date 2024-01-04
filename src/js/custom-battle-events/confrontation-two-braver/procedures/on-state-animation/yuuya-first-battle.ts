import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaCryWhenFirstBattle } from "../../animation/yuuya-cry-when-first-battle";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ ファーストバトル */
export const yuuyaFirstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    return playerBattleCount(props.stateHistory, enemy.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId
      ? yuuyaCryWhenFirstBattle(props)
      : null;
  },
];
