import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../../props";
import { turnCount } from "../../../turn-count";
import { yuuyaMonologueWhenFirstBattle } from "../../animation/yuuya-monologue-when-first-battle";

/** 最初の戦闘 */
export const firstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return turnCount(props.stateHistory) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaMonologueWhenFirstBattle(props)
      : null;
  },
];
