import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaBattleShoutWhenMiss } from "../../animation/yuuya-battle-shout-when-miss";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ 戦闘 ミス */
export const yuuyaBattleWhenMiss: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, playerId } = props;
  const { effect } = currentState;
  const hasPlayerMiss = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === playerId &&
      s.effect.result.name === "Miss",
  );

  if (
    hasPlayerMiss &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaBattleShoutWhenMiss(props);
  } else if (
    hasPlayerMiss &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
