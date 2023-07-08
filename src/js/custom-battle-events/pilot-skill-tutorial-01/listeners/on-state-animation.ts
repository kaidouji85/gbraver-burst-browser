import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { tsubasaVictoryDeclaration } from "../animation/tsubasa-victory-declaration";
import { isPilotSkillActivatedByTsubasa } from "./is-pilot-skill-activated-by-tsubasa";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (isPilotSkillActivatedByTsubasa(props)) {
    return tsubasaVictoryDeclaration(props);
  }

  return empty();
}
