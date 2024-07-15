import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バーストが使えるのに0防御した場合のストーリー
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function zeroDefenseButEnableBurst(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「なぜ${wbr}バーストを${wbr}使わない`],
    [`私を${wbr}愚弄する${wbr}のか ユウヤ」`],
  ]);
  invisibleAllMessageWindows(props);
}
