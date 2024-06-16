import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintFailShout1 } from "../../animation/tsubasa-feint-fail-shout1";
import { tsubasaFeintFailShout2 } from "../../animation/tsubasa-feint-fail-shout2";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 失敗 */
export const tsubasaFeintFail: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { enemyId } = props;
  const { effect } = props.currentState;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    effect.defenderBattery === 0
  ) {
    result = tsubasaFeintFailShout1(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    !effect.result.isDefenderMoved
  ) {
    result = tsubasaFeintFailShout2(props);
  }

  return result;
};
