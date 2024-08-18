import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaFeintShoutWhenFirstBattle } from "../../animation/yuuya-feint-shout-when-first-battle";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ ファーストバトルでフェイント */
export const yuuyaFeintWhenFirstBattle: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { effect } = currentState;
  const isBatteryDeclarationOnFeint =
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    effect.attackerBattery === 0;
  const isBattleOnFeint =
    effect.name === "Battle" &&
    effect.attacker === playerId &&
    effect.result.name === "Feint";
  const isFirstBattle = playerBattleCount(stateHistory, playerId) === 1;
  if (isBatteryDeclarationOnFeint && isFirstBattle) {
    result = yuuyaFeintShoutWhenFirstBattle(props);
  } else if (isBattleOnFeint && isFirstBattle) {
    result = empty();
  }

  return result;
};
