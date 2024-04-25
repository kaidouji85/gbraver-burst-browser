import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 試合終了の礼
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const gameEndThanks = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「これにて台東高校 大田高校の合同練習試合を終了する"],
    ["一同 姿勢を正して 礼!!」"],
  ]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Gai");
  props.view.dom.leftMessageWindow.messages([
    "ガイ",
    "「ありがとうございました」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「ありがとうございました」"]]);
  invisibleAllMessageWindows(props);
};
