import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaShoutWhenHeDeliversFinalBlow } from "../../animation/yuuya-shout-when-he-delivers-final-blow";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ トドメの一撃 */
export const yuuyaFinishBlow: ConditionalAnimation<
  CustomStateAnimationProps & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const enemy = separatePlayersFromCurrentState(props)?.enemy;
    if (!enemy) {
      return null;
    }

    const hasEnemyDeliveredFinishBlow = hasDeliveredFinishBlow(
      props.stateHistory,
      enemy.playerId,
    );
    return props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId &&
      hasEnemyDeliveredFinishBlow
      ? yuuyaShoutWhenHeDeliversFinalBlow(props)
      : null;
  },
];
