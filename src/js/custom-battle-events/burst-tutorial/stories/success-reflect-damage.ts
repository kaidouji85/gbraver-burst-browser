import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー ダメージ反射成功
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const successReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「かかったな大田高校のエース君"],
    ["これぞ奥義 電撃バリアや」"],
  ]);
  invisibleAllMessageWindows(props);
};
