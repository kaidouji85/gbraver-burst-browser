import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";
import { hasYuuyaActivatedBurst } from "./has-yuuya-activated-burst";

/**
 * 敵叫びメッセージウィンドウを非表示にする
 * @param props イベントプロパティ
 * @return アニメーション
 */
const invisibleEnemyCryMessageWindow = (
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
) =>
  process(() => {
    props.view.dom.enemyCryMessageWindow.visible(false);
  });

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
): Animate {
  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    hasYuuyaActivatedBurst(props)
  ) {
    return invisibleEnemyCryMessageWindow(props);
  }

  if (
    props.state.chapter.type === "ShinyaHasAdvantage" &&
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return invisibleEnemyCryMessageWindow(props);
  }

  return empty();
}
