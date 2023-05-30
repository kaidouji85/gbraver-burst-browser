import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { StateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { tsubasaVictoryDeclaration } from "../animation/tsubasa-victory-declaration";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function stateAnimation(props: StateAnimation): Animate {
  const turn = turnCount(props.stateHistory);
  if (
    turn === 3 &&
    props.currentState.effect.name === "BatteryDeclaration" &&
    props.currentState.effect.attacker !== props.playerId
  ) {
    return tsubasaVictoryDeclaration(props);
  }

  return empty();
}
