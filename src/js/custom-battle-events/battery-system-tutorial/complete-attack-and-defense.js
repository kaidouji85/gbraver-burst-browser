// @flow
import type {CustomBattleEventProps} from "../../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../active-message-window";
import {scrollLeftMessages, scrollRightMessages} from "../scroll-messages";

/**
 * ストーリー 攻撃、防御を一通り体験した
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const completeAttackAndDefense = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これで攻撃 防御を一通り体験したな'],
    ['以降はどちらかのHPが0になるまで これを繰り返すんだ'],
    ['以上で基本ルールは完了だ ここから先は好きなように戦ってくれ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['勝負はこれからッスよ ツバサ先輩」']
  ]);
  props.view.dom.rightMessageWindow.darken();
};