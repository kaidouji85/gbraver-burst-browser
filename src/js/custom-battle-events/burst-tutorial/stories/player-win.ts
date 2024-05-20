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
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const playerWin = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「やめ!!"],
    [`この試合${wbr} ……シンヤの${wbr}勝ち」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「やった${wbr} 上級生に${wbr}勝てたッス」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「下級生やと思て${wbr} 舐めとったわ`],
    [`さすがやな${wbr} 大田高校の${wbr}エース君」`],
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
  await refreshConversation(props, 200);
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「……シンブレイバー${wbr}か`],
    [
      `野暮用で${wbr}関東まで${wbr}来てみたが${wbr} 面白い${wbr}奴を${wbr}見つけたな」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
};
