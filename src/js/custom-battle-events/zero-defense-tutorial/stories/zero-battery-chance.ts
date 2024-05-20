import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 0バッテリーチャンス
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const zeroBatteryChance = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「ガイ君の${wbr}バッテリーが${wbr}0になった`],
    [`シンヤ${wbr} 今こそ${wbr}攻撃の${wbr}チャンスだ」`],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「……どうして${wbr}相手の${wbr}バッテリーが${wbr}0だと${wbr}チャンス${wbr}なんスか」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「いい質問だな${wbr} シンヤ`],
    [`0防御${wbr}すると${wbr} HPが${wbr}満タンでも${wbr}即死${wbr}するんだ」`],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    [`じゃあ${wbr} このまま${wbr}一気に${wbr}決めるッス」`],
  ]);
  invisibleAllMessageWindows(props);
};
