import { Animate } from "../../../../animation/animate";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { getPlayerBattleCount } from "../../../get-battle-count";
import { tsubasaFourthAttackShout1 } from "../../animation/tsubasa-fourth-attack-shout1";
import { tsubasaFourthAttackShout2 } from "../../animation/tsubasa-fourth-attack-shout2";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 4回目攻撃 */
export const tsubasaFourthAttack: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = getPlayerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 4 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = tsubasaFourthAttackShout1(props);
  } else if (
    battleCount === 4 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = tsubasaFourthAttackShout2(props);
  }

  return result;
};
