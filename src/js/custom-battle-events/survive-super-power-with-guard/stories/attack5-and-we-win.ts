import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 5攻撃すれば勝利
 * @param props イベントプロパティ
 */
export async function attack5AndWeWin(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「見ろ大田高校 こちらの新型${wbr}グランランドーザを`],
    [`こいつの${wbr}パワーなら お前らの${wbr}ロボなど一撃`],
    [`このターン ５攻撃で${wbr}俺たちの勝ちだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
