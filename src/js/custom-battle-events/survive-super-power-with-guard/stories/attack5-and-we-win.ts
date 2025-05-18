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
    ["ガイ", `「フハハハハ 見ろ${wbr}大田高校`],
    [
      `この新型の${wbr}グランドーザの${wbr}パワーなら ウィングドーザなど${wbr}一撃`,
    ],
    [`5攻撃を${wbr}凌げなければ 俺たちの勝ちだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
