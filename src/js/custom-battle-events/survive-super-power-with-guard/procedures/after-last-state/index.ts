import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { isZeroDefenseButBatteryPositiveFromLastState } from "../../../is-zero-defense-but-battery-positive";
import { isZeroDefenseButEnableBurstFromLastState } from "../../../is-zero-defense-but-enable-burst";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { playerLose } from "../../stories/player-lose";
import { secondTurnLose } from "../../stories/second-turn-lose";
import { tsubasaVictory } from "../../stories/tsubasa-victory";
import { zeroDefenseButEnableBurst } from "../../stories/zero-defense-but-enable-burst";
import { zeroDefenseButPositiveBattery } from "../../stories/zero-defense-but-positive-battery";
import { shouldPlayPlayerLose } from "./shoud-play-player-lose";
import { shouldPlaySecondTurnLose } from "./should-play-second-turn-lose";
import { shouldPlayTsubasaVictory } from "./should-play-tsubasa-victory";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  if (isZeroDefenseButBatteryPositiveFromLastState(props)) {
    await zeroDefenseButPositiveBattery(props);
  } else if (isZeroDefenseButEnableBurstFromLastState(props)) {
    await zeroDefenseButEnableBurst(props);
  } else if (shouldPlaySecondTurnLose(props)) {
    await secondTurnLose(props);
  } else if (shouldPlayPlayerLose(props)) {
    await playerLose(props);
  } else if (shouldPlayTsubasaVictory(props)) {
    await tsubasaVictory(props);
  }
}
