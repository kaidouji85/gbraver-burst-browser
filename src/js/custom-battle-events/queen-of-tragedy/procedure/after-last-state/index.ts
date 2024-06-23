import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaVictory } from "../../stories/tsubasa-victory";
import { yuuyaVictory } from "../../stories/yuuya-victory";
import { createConditions } from "./create-conditions";
import { shouldTsubasaVictory } from "./should-tsubasa-victory";
import { shouldYuuyaVictory } from "./should-yuuya-victory";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(props: LastState & QueenOfTragedyProps) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  const conditions = createConditions(props);
  if (shouldYuuyaVictory(conditions)) {
    await yuuyaVictory(props);
  } else if (shouldTsubasaVictory(conditions)) {
    await tsubasaVictory(props);
  }
}
