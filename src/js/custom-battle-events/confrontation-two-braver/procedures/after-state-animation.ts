import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import {hasYuuyaActivatedBurst} from "./has-yuuya-activated-burst";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation>,
): Animate {
  if (hasYuuyaActivatedBurst(props)) {
    return process(() => {
      props.view.dom.enemyCryMessageWindow.visible(false);
    });
  }

  return empty();
}
