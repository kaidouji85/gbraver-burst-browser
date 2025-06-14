import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFeintSuccessShout } from "../../animation/tsubasa-feint-success-shout";
import { tsubasaFeintSuccessShoutAfterThird } from "../../animation/tsubasa-feint-success-shout-after-third";
import { tsubasaFeintSuccessShoutOnSecond } from "../../animation/tsubasa-feint-success-shout-on-second";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ フェイント 成功 */
export const tsubasaFeintSuccess: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;
  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const feintSuccessCount = stateHistory.filter(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === enemyId &&
      s.effect.result.name === "Feint" &&
      s.effect.result.isDefenderMoved,
  ).length;
  const isBatteryDeclarationOnFeintSuccess =
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    0 < effect.defenderBattery;
  const isBattleOnFeintSuccess =
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    effect.result.isDefenderMoved;

  if (isBatteryDeclarationOnFeintSuccess && feintSuccessCount === 1) {
    result = tsubasaFeintSuccessShout(props);
  } else if (isBattleOnFeintSuccess && feintSuccessCount === 1) {
    result = empty();
  } else if (isBatteryDeclarationOnFeintSuccess && feintSuccessCount === 2) {
    result = tsubasaFeintSuccessShoutOnSecond(props);
  } else if (isBattleOnFeintSuccess && feintSuccessCount === 2) {
    result = empty();
  } else if (isBatteryDeclarationOnFeintSuccess && 3 <= feintSuccessCount) {
    result = tsubasaFeintSuccessShoutAfterThird(props);
  } else if (isBattleOnFeintSuccess && 3 <= feintSuccessCount) {
    result = empty();
  }

  return result;
};
