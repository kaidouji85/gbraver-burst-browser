import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaFirstAttackShout1 } from "../../animation/yuuya-first-attack-shout1";
import { yuuyaFirstAttackShout2 } from "../../animation/yuuya-first-attack-shout2";
import { yuuyaFullBatteryAttackOnTraumaOfLastYear } from "../../animation/yuuya-full-battery-attack-on-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃 */
export const yuuyaAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { chapter } = props.state;
  const battleCount = playerBattleCount(stateHistory, playerId);

  if (
    chapter.type === "TraumaOfLastYear" &&
    battleCount === 1 &&
    currentState.effect.name === "BatteryDeclaration"
  ) {
    result = yuuyaFullBatteryAttackOnTraumaOfLastYear(props);
  } else if (
    chapter.type === "None" &&
    battleCount === 1 &&
    currentState.effect.name === "BatteryDeclaration"
  ) {
    result = yuuyaFirstAttackShout1(props);
  } else if (
    chapter.type === "None" &&
    battleCount === 1 &&
    currentState.effect.name === "Battle"
  ) {
    result = yuuyaFirstAttackShout2(props);
  }

  return result;
};
