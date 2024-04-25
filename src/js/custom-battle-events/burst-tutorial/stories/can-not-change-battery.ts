import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー バースト、パイロットスキルが使えないのでバッテリー変更なし
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const canNotChangeBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーは5もないッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「ならばバースト発動だ ……と言いたいところだが発動済か"],
    ["こうなればパイロットスキル ……も使い切ったか"],
    ["すまんシンヤ これ以上打つ手なしだ」"],
  ]);
  invisibleAllMessageWindows(props);
};
