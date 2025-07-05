import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { firstTurnLose } from "../../stories/first-turn-lose";
import { playerLose } from "../../stories/player-lose";
import { tsubasaVictory } from "../../stories/tsubasa-victory";
import { shouldPlayPlayerLose } from "./shoud-play-player-lose";
import { shouldPlayFirstTurnLose } from "./should-play-first-turn-lose";
import { shouldPlayTsubasaVictory } from "./should-play-tsubasa-victory";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  if (shouldPlayFirstTurnLose(props)) {
    await firstTurnLose(props);
  } else if (shouldPlayPlayerLose(props)) {
    await playerLose(props);
  } else if (shouldPlayTsubasaVictory(props)) {
    await tsubasaVictory(props);
  }
}
