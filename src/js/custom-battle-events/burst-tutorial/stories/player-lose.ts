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
    ["この試合 ライト先輩の勝ち!!"],
  ]);
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「どや大田高校 これが台東高校の実力や」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「……これが上級生の力」"]]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [["ガイ", "「双方 姿勢を正して 礼!!」"]]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Raito");
  props.view.dom.leftMessageWindow.messages([
    "ライト",
    "「ありがとうございました」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「ありがとうございました」"]]);
  invisibleAllMessageWindows(props);
};
