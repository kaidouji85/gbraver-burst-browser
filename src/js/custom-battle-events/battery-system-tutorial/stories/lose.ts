import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤーの敗北
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function lose(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「あと<wbr>もう少しで<wbr>勝てたのに」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「そう落ち込むな"],
    ["はじめてにしては<wbr>悪くなかったぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
