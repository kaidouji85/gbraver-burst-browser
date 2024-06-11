import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaFullBatteryAttackOnTraumaOfLastYear } from "../../animation/yuuya-full-battery-attack-on-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃 1年前のトラウマ */
export const yuuyaAttackOnTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { playerId } = props;
  const { effect } = props.currentState;
  const { chapter } = props.eventState;

  if (
    chapter.type === "TraumaOfLastYear" &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaFullBatteryAttackOnTraumaOfLastYear(props);
  }

  return result;
};
