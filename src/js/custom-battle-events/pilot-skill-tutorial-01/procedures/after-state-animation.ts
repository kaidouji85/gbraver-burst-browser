import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { isPilotSkillActivatedByTsubasa } from "./is-pilot-skill-activated-by-tsubasa";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (isPilotSkillActivatedByTsubasa(props)) {
    return onStart(() => {
      props.view.dom.enemyShoutMessageWindow.visible(false);
    });
  }

  return empty();
}
