import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintSuccessShout } from "../../animation/tsubasa-feint-success-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 成功 */
export const tsubasaFeintSuccess: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId } = props;
  const { effect } = props.currentState;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    0 < effect.defenderBattery
  ) {
    return tsubasaFeintSuccessShout(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    effect.result.isDefenderMoved
  ) {
    return empty();
  }

  return null;
};
