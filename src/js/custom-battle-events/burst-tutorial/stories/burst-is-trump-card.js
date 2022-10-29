// @flow

import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー バーストは切り札
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function burstIsTrumpCard(
  props: CustomBattleEventProps
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [["バーストは切り札だ"]]);
  await refreshConversation(props, 100);
}
