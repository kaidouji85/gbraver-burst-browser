import {Animate} from "../../../animation/animate";
import { process } from "../../../animation/process";
import {CustomStateAnimation} from "../../../td-scenes/battle/custom-battle-event";
import {isPilotSkillActivatedByTsubasa} from "./is-pilot-skill-activated-by-tsubasa";
import {empty} from "../../../animation/delay";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation>
): Animate {
  if (isPilotSkillActivatedByTsubasa(props)) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  return empty();
}