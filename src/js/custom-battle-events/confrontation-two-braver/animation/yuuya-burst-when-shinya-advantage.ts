import {CustomBattleEventProps} from "../../../td-scenes/battle/custom-battle-event";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";

/**
 * ユウヤのバースト シンヤ有利時
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function yuuyaBurstWhenShinyaAdvantage(
  props: Readonly<CustomBattleEventProps>
): Animate {
  const messageWindow = props.view.dom.enemyCryMessageWindow;
  return process(() => {
    messageWindow.visible(true);
    messageWindow.lighten();
    messageWindow.face("Yuuya");
    messageWindow.faceVisible(true);
    messageWindow.messages(["甘いぜ シンヤ！！"]);
    messageWindow.nextMessageIconVisible(false);
  });
}