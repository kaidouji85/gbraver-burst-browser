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
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーは5もないッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「ならばバーストを発動させよう"],
    ["バーストは1試合に1回しか使えないが 一気にバッテリーを回復できるんだ」"],
  ]);
  invisibleAllMessageWindows(props);
};
