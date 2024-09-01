import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintFailShout } from "../../animation/tsubasa-feint-fail-shout";
import { tsubasaFeintFailShoutAfterThird } from "../../animation/tsubasa-feint-fail-shout-after-third";
import { tsubasaFeintFailShoutOnSecond } from "../../animation/tsubasa-feint-fail-shout-on-second";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 失敗 */
export const tsubasaFeintFail: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;
  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const feintFailCount = stateHistory.filter(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === enemyId &&
      s.effect.result.name === "Feint" &&
      !s.effect.result.isDefenderMoved,
  ).length;
  const isBatteryDeclarationOnFeintFail =
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    effect.defenderBattery === 0;
  const isBattleOnFeintFail =
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    !effect.result.isDefenderMoved;

  if (isBatteryDeclarationOnFeintFail && feintFailCount === 1) {
    result = tsubasaFeintFailShout(props);
  } else if (isBattleOnFeintFail && feintFailCount === 1) {
    result = empty();
  } else if (isBatteryDeclarationOnFeintFail && feintFailCount === 2) {
    result = tsubasaFeintFailShoutOnSecond(props);
  } else if (isBattleOnFeintFail && feintFailCount === 2) {
    result = empty();
  } else if (isBatteryDeclarationOnFeintFail && 3 <= feintFailCount) {
    result = tsubasaFeintFailShoutAfterThird(props);
  } else if (isBattleOnFeintFail && 3 <= feintFailCount) {
    result = empty();
  }

  return result;
};
