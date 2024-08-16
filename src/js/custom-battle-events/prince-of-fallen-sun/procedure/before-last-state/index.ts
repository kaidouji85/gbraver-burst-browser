import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { PrinceOfFallenSunProps } from "../../props";
import { PrinceOfFallenSunState } from "../../state";
import { introduction } from "../../stories/introduction";
import { createConditions } from "./create-conditions";
import { shouldPlayIntroduction } from "./should-play-introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & PrinceOfFallenSunProps,
): Promise<PrinceOfFallenSunState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let latestEventState: PrinceOfFallenSunState = props.eventState;
  const conditions = createConditions(props);
  if (shouldPlayIntroduction(latestEventState, conditions)) {
    await introduction(props);
    latestEventState = { ...latestEventState, isIntroductionComplete: true };
  }

  return latestEventState;
}