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
 * ストーリー チュートリアル終了
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function tutorialEnd(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「これにて操縦訓練を${wbr}終了する`],
    [`姿勢を正して${wbr} 礼!!」」`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    `「ありがとう${wbr}ございました」`,
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「ありがとう${wbr}ございました」`],
  ]);
  invisibleAllMessageWindows(props);
}
