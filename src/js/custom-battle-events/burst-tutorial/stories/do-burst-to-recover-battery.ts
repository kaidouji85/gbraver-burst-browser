import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー バーストでバッテリー回復
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const doBurstToRecoverBattery = async (
  props: CustomBattleEventProps,
) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「でも${wbr}ツバサ先輩${wbr} 俺の${wbr}バッテリーは${wbr}5も${wbr}ないッスよ」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「ならば${wbr}バーストを${wbr}発動${wbr}させよう`],
    [
      `バーストは${wbr}1試合に${wbr}1回しか${wbr}使え${wbr}ないが${wbr} 一気に${wbr}バッテリーを${wbr}回復${wbr}できるんだ」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
};
