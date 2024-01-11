import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー ダメージ反射失敗
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const failReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「さすが大田高校のエース君"],
    ["この程度の小細工は通用せぇへんか」"],
  ]);
  invisibleAllMessageWindows(props);
};
