import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { isPilotSkillActivatedByGai } from "./is-pilot-skill-activated-by-gai";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (isPilotSkillActivatedByGai(props)) {
    return process(() => {
      props.view.dom.playerShoutMessageWindow.visible(false);
    });
  }

  return empty();
}
