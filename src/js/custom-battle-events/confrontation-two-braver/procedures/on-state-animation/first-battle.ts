import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { battleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { shinyaMonologueWhenFirstBattle } from "../../animation/shinya-monologue-when-first-battle";
import { ConfrontationTwoBraverProps } from "../../props";

/** 最初の戦闘 */
export const firstBattle: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return battleCount(props.stateHistory) === 1 &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? shinyaMonologueWhenFirstBattle(props)
      : null;
  },
];
