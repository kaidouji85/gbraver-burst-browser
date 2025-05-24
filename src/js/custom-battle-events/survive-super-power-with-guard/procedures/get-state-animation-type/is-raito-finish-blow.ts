import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { StateAnimationTypeCondition } from "../../state-animation-type";

/**
 * 「RaitoFinishBlow」か否かを判定する
 * @param options オプション
 * @returns 判定結果、trueの場合は「RaitoFinishBlow」
 */
export function isRaitoFinishBlow(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimation;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): boolean {
  const { currentState } = options.props;
  const { enemy } = options.condition;
  const hasRaitoFinishBlow = hasDeliveredFinishBlow(
    options.props.stateHistory,
    enemy.playerId,
  );

  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    hasRaitoFinishBlow
  );
}
