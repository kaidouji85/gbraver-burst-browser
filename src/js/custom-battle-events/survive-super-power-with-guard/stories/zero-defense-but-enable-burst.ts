import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バースト出来るのに0防御した
 * @param props イベントプロパティ
 */
export async function zeroDefenseButEnableBurst(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「なんで${wbr}バーストを${wbr}発動せぇへん${wbr}のや`],
    [`わいのこと${wbr}バカに${wbr}しとんのか ツバサ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
