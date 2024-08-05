import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintFailShout } from "../../animation/tsubasa-feint-fail-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 失敗 */
export const tsubasaFeintFail: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId } = props;
  const { effect } = props.currentState;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    effect.defenderBattery === 0
  ) {
    return tsubasaFeintFailShout(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    !effect.result.isDefenderMoved
  ) {
    return empty();
  }

  return null;
};
