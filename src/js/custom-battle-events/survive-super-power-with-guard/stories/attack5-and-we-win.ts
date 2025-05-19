import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 5攻撃すれば勝利
 * @param props イベントプロパティ
 */
export async function attack5AndWeWin(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「見ろ大田高校 こちらの新型${wbr}グランランドーザを`],
    [`こいつの${wbr}パワーなら お前らの${wbr}ロボなど一撃だ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `(こちらの情報を${wbr}ペラペラと`],
    [`オーナーの息子${wbr}やなかったら${wbr}シバき倒しとる${wbr}ところや)`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
