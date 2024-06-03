import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「待て${wbr} シンヤ`],
    [`あと${wbr}一撃でも${wbr}食らえば${wbr} 君の${wbr}負けだぞ`],
    [
      `ライトは${wbr}恐らく${wbr}4攻撃を${wbr}してくるから${wbr} 5防御で${wbr}回避${wbr}するんだ」`,
    ],
  ]);
  await refreshConversation(props, 100);
};
