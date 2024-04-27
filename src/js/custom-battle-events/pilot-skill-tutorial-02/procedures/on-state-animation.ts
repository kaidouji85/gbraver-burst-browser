import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { gaiShout } from "../animation/gai-shout";
import { isPilotSkillActivatedByGai } from "./is-pilot-skill-activated-by-gai";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (isPilotSkillActivatedByGai(props)) {
    return gaiShout(props);
  }

  return empty();
}
