import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー ダメージ反射成功
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const successReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「かかったな${wbr} エース君`],
    [`これぞ${wbr}奥義${wbr} 電撃バリアや」`],
  ]);
  invisibleAllMessageWindows(props);
};
