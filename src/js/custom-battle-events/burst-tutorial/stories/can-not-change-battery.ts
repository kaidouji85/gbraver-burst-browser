import { wbr } from "../../../dom/wbr";
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
    [
      "シンヤ",
      `「でも${wbr}ツバサ先輩${wbr} 俺の${wbr}バッテリーは${wbr}5も${wbr}ないッスよ」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「ならば${wbr}バースト${wbr}発動だ ……と${wbr}言いたい${wbr}ところだが${wbr}発動済か`,
    ],
    [`こうなれば${wbr}パイロットスキル${wbr} ……も${wbr}使い${wbr}切ったか`],
    [`すまん${wbr}シンヤ${wbr} これ以上${wbr}打つ手${wbr}なしだ」`],
  ]);
  invisibleAllMessageWindows(props);
};
