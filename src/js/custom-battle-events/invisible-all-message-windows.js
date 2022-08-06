// @flow
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";

/**
 * 全メッセージウインドウを非表示にする
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function invisibleAllMessageWindows(props: BattleSceneProps): void {
  props.view.dom.leftMessageWindow.visible(false);
  props.view.dom.rightMessageWindow.visible(false);
}