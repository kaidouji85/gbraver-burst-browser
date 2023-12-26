import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { battleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaMonologueWhenFirstBattle } from "../../animation/yuuya-monologue-when-first-battle";
import { ConfrontationTwoBraverProps } from "../../props";

/** 最初の戦闘 */
export const firstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return battleCount(props.stateHistory) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaMonologueWhenFirstBattle(props)
      : null;
  },
];
