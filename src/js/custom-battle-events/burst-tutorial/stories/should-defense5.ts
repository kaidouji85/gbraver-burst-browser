import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 5防御しないと負け
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const shouldDefense5 = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「待て シンヤ"],
    ["あと一撃でも食らえば 君の負けだぞ"],
    ["ライトは恐らく4攻撃をしてくるから 5防御で回避するんだ」"],
  ]);
  await refreshConversation(props, 100);
};
