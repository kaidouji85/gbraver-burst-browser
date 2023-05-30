import { Animate } from "../../../animation/animate"
import { empty } from "../../../animation/delay";
import { StateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { tsubasaVictoryDeclaration } from "../animation/tsubasa-victory-declaration";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function stateAnimation(props: StateAnimation): Animate {
  if (
    props.currentState.effect.name === "PilotSkillEffect" &&
    props.currentState.effect.invokerId !== props.playerId
  ) {
    return tsubasaVictoryDeclaration(props);
  }
  return empty();
}