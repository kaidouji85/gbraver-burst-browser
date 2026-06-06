import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { separatePlayersFromCurrentState } from "../../../../td-scenes/battle/separate-players";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { getPlayerBattleCount } from "../../../get-battle-count";
import { yuuyaShoutWhenFirstBattle } from "../../animation/yuuya-shout-when-first-battle";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ ファーストバトル */
export const yuuyaFirstBattle: ConditionalAnimation<
  CustomStateAnimationProps & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    return getPlayerBattleCount(props.stateHistory, enemy.playerId) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId
      ? yuuyaShoutWhenFirstBattle(props)
      : null;
  },
];
