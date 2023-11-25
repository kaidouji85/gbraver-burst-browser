import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { process } from "../../../animation/process";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { hasYuuyaActivatedBurst } from "./has-yuuya-activated-burst";

/**
 * 敵叫びメッセージウィンドウを非表示にする
 * @param props イベントプロパティ
 * @return あにメーション
 */
const invisibleEnemyCryMessageWindow = (
  props: Readonly<CustomStateAnimation>,
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
  props: Readonly<CustomStateAnimation>,
): Animate {
  const turn = turnCount(props.stateHistory);
  if (turn === 3 && hasYuuyaActivatedBurst(props)) {
    return invisibleEnemyCryMessageWindow(props);
  }

  if (turn === 3 && props.currentState.effect.name === "BatteryDeclaration") {
    return invisibleEnemyCryMessageWindow(props);
  }

  return empty();
}
