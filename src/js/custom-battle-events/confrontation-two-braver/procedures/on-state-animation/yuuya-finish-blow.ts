import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaCryWhenHeDeliversFinalBlow } from "../../animation/yuuya-cry-when-he-delivers-final-blow";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ トドメの一撃 */
export const yuuyaFinishBlow: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    const hasEnemyDeliveredFinishBlow = props.stateHistory.some(
      (state) =>
        state.effect.name === "Battle" &&
        state.effect.attacker === enemy.playerId &&
        state.effect.isDeath,
    );
    return props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId &&
      hasEnemyDeliveredFinishBlow
      ? yuuyaCryWhenHeDeliversFinalBlow(props)
      : null;
  },
];
