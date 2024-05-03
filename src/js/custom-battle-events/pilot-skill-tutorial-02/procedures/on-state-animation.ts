import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { gaiPilotSkill } from "../animation/gai-pilot-skill";
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
    return gaiPilotSkill(props);
  }

  return empty();
}
