import { wbr } from "../../../dom/wbr";
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
    [
      "ツバサ",
      `「これにて${wbr}台東高校・${wbr}大田高校の${wbr}合同練習試合を${wbr}終了する`,
    ],
    [`一同${wbr} 姿勢を正して${wbr} 礼!!」`],
  ]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Gai");
  props.view.dom.leftMessageWindow.messages([
    "ガイ",
    `「ありがとう${wbr}ございました」`,
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「ありがとう${wbr}ございました」`],
  ]);
  invisibleAllMessageWindows(props);
};
