import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー うっかり5防御以外を選択
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const notDefense5Carelessly = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「すみません うっかりしてたッス」"],
  ]);
  invisibleAllMessageWindows(props);
};
