import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";

/**
 * ステートアニメ終了後に呼ばれるアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimationProps>,
): Animate {
  if (props.currentState.effect.name === "PilotSkillEffect") {
    return onStart(() => {
      invisibleAllMessageWindows(props);
    });
  }
  return empty();
}
