import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 地に落ちたもんやな
 * @param props イベントプロパティ
 */
export async function chiniOchita(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「なんや もう${wbr}終わり${wbr}かいな`],
    [`全国２位も${wbr}地に落ちた${wbr}もんやな`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
