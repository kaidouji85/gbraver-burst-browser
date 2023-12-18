import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { gaiCry } from "../animation/gai-cry";
import { isPilotSkillActivatedByGai } from "./is-pilot-skill-activated-by-gai";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (isPilotSkillActivatedByGai(props)) {
    return gaiCry(props);
  }

  return empty();
}
