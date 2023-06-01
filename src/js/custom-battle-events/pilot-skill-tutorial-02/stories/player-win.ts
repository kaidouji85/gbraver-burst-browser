import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * プレイヤー勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function playerWin(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「そこまで"],
    ["この試合 ガイの勝ちッス」"]
  ]);
  props.view.dom.rightMessageWindow.darken();
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「……パイロットを変えるだけで ここまで変わるのか」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「シンヤ ガイ君 これがロボとパイロットの相性だ"],
  ]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「姿勢を正して 礼！！」"],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    "「ありがとうございました」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [["ガイ", "「ありがとうございました」"]]);
}