import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintSuccessShout } from "../../animation/tsubasa-feint-success-shout";
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
    result = tsubasaFeintSuccessShout(props);
  }

  return result;
};
