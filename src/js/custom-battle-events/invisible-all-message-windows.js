// @flow
import type {CustomBattleEventProps} from "../game/td-scenes/battle/custom-battle-event";

/**
 * 全メッセージウインドウを非表示にする
 *
 * @param props イベントプロパティ
 */
export function invisibleAllMessageWindows(props: CustomBattleEventProps): void {
  props.view.dom.leftMessageWindow.visible(false);
  props.view.dom.rightMessageWindow.visible(false);
}