import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * チャプター イーブンマッチ シンヤ独白
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function shinyaMonologueWhenEvenMatch(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「状況は${wbr}五分${wbr} まだ${wbr}いけるッス」`],
  ]);
  invisibleAllMessageWindows(props);
}
