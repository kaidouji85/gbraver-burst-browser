import { Animate } from "../../../../animation/animate";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaAttackShoutWhenTraumaOfLastYear } from "../../animation/yuuya-attack-shout-when-trauma-of-last-year";
import { yuuyaFullBatteryAttackShoutWhenTraumaOfLastYear } from "../../animation/yuuya-full-battery-attack-shout-when-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃 1年前のトラウマ */
export const yuuyaAttackWhenTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { playerId } = props;
  const { effect } = props.currentState;
  const { chapter } = props.eventState;

  if (
    chapter.type === "TraumaOfLastYear" &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    effect.attackerBattery === 8
  ) {
    result = yuuyaFullBatteryAttackShoutWhenTraumaOfLastYear(props);
  } else if (
    chapter.type === "TraumaOfLastYear" &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaAttackShoutWhenTraumaOfLastYear(props);
  }

  return result;
};
