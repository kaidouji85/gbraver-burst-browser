import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import {CustomStateAnimation} from "../../../td-scenes/battle/custom-battle-event";
import {ConfrontationTwoBraverProps} from "../props";
import {invisibleEnemyCryMessageWindow} from "../animation/invisible-enemy-cry-message-window";

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
    props.currentState.effect.name === "BatteryDeclaration"
  ) {
    return invisibleEnemyCryMessageWindow(props);
  }

  return empty();
}
