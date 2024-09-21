import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaAttackShoutWhenNormalHit } from "../../animation/yuuya-attack-shout-when-normal-hit";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ 攻撃ヒット */
export const yuuyaAttackWhenNormalHit: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, playerId } = props;
  const { effect } = currentState;
  const hasPlayerNormalHit = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === playerId &&
      s.effect.result.name === "NormalHit",
  );

  if (
    hasPlayerNormalHit &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaAttackShoutWhenNormalHit(props);
  } else if (
    hasPlayerNormalHit &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
