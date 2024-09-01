import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { PrinceOfFallenSunProps } from "../../props";
import { gaiVictory } from "../../stories/gai-victory";
import { createConditions } from "./create-conditions";
import { shouldGaiVictory } from "./should-gai-victory";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: LastState & PrinceOfFallenSunProps,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  const conditions = createConditions(props);
  if (shouldGaiVictory(conditions)) {
    await gaiVictory(props);
  }
}
