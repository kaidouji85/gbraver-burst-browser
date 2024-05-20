import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤーの勝利
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function victory(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「俺の勝ちッスよ${wbr} ツバサ先輩」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「見事だ${wbr} シンヤ`],
    [`この調子で${wbr}新人戦も${wbr}頑張ってくれ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
