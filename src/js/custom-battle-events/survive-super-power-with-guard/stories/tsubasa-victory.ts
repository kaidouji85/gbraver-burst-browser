import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ツバサの勝利
 * @param props イベントプロパティ
 */
export async function tsubasaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「なんて奴らだ ライト先輩と${wbr}新型を${wbr}退ける${wbr}とは`],
    [`……こうなったら アレを${wbr}出す${wbr}しかない」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
