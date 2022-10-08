// @flow
import type {CustomBattleEventProps} from "../../../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../../active-message-window";
import {refreshConversation} from "../../invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "../../scroll-messages";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function introduction(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これより 操縦訓練を開始する'],
    ['姿勢を正して 礼!!」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  props.view.dom.leftMessageWindow.messages(
    ['ツバサ', '「よろしくお願いします」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「いい返事だな では早速はじめよう'],
    ['試合の基本は攻撃側 防御側でのバッテリーの出し合いだ'],
    ['大きいバッテリーを出した側の行動が成功するのだが これは実際にやってみた方が早いな'],
    ['シンヤ 私が防御に回るから 好きなように攻撃してくれ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['それじゃ遠慮なく行くッスよ ツバサ先輩」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
}