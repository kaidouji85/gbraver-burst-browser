import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintSuccessShout1 } from "../../animation/tsubasa-feint-success-shout1";
import { tsubasaFeintSuccessShout2 } from "../../animation/tsubasa-feint-success-shout2";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 成功 */
export const tsubasaFeintSuccess: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { enemyId } = props;
  const { effect } = props.currentState;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    0 < effect.defenderBattery
  ) {
    result = tsubasaFeintSuccessShout1(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    effect.result.isDefenderMoved
  ) {
    result = tsubasaFeintSuccessShout2(props);
  }

  return result;
};
