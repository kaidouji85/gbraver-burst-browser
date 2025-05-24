import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaBattleShoutWhenNormalHit } from "../../animation/yuuya-battle-shout-when-normal-hit";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ 戦闘 通常ヒット */
export const yuuyaBattleWhenNormalHit: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
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
    result = yuuyaBattleShoutWhenNormalHit(props);
  } else if (
    hasPlayerNormalHit &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
