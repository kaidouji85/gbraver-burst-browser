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
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤーの敗北
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const playerLose = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「やめ!!"],
    [`この試合${wbr} ライト先輩の${wbr}勝ち!!`],
  ]);
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    [
      "ライト",
      `「どや${wbr}大田高校${wbr} これが${wbr}台東高校の${wbr}実力や」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「……これが${wbr}上級生の${wbr}力」`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [["ガイ", "「双方 姿勢を正して 礼!!」"]]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Raito");
  props.view.dom.leftMessageWindow.messages([
    "ライト",
    `「ありがとう${wbr}ございました」`,
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「ありがとう${wbr}ございました」`],
  ]);
  invisibleAllMessageWindows(props);
};
