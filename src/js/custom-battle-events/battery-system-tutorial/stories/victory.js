// @flow
import type {CustomBattleEventProps} from "../../../td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../../active-message-window";
import {scrollLeftMessages, scrollRightMessages} from "../../scroll-messages";

/**
 * ストーリー プレイヤーの勝利
 *
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function victory(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺の勝ちッスよ ツバサ先輩」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「見事だ シンヤ'],
    ['この調子で精進を積んでくれ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
}