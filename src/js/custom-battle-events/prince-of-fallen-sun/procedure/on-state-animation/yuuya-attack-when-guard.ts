import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { PrinceOfFallenSunProps } from "../../props";
import {yuuyaAttackShoutWhenGuard} from "../../animation/yuuya-attack-shout-when-guard";

/** ユウヤ ガード */
export const yuuyaAttackWhenGuard: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, playerId } = props;
  const { effect } = currentState;
  const hasPlayerGuard = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === playerId &&
      s.effect.result.name === "Guard",
  );

  if (
    hasPlayerGuard &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaAttackShoutWhenGuard(props);
  } else if (
    hasPlayerGuard &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
