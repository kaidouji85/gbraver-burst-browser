import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー パイロットスキルでバッテリー回復
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const doPilotSkillToRecoverBattery = async (
  props: CustomBattleEventProps,
) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーは5もないッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「ならばパイロットスキルでバッテリーを回復させよう」"],
  ]);
  invisibleAllMessageWindows(props);
};
