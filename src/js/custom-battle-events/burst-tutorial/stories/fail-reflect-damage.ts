import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー ダメージ反射失敗
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const failReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「さすが${wbr}大田高校の${wbr}エース君`],
    [`この程度の${wbr}小細工は${wbr}通用${wbr}せぇへんか」`],
  ]);
  invisibleAllMessageWindows(props);
};
