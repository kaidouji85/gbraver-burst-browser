import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { ConfrontationTwoBraverProps } from "../../props";
import { ConfrontationTwoBraverState } from "../../state";
import { introduction } from "../../stories/introduction";
import { isEvenMatchEnd } from "./is-even-match-end";
import { isShinyaAdvantageEnd } from "./is-shinya-advantage-end";
import { isYuuyaActivateSkillToFinishEnd } from "./is-yuuya-activate-skill-to-finish-end";
import { isYuuyaActivateSkillToSurviveEnd } from "./is-yuuya-activate-skill-to-survive-end";
import { isYuuyaAdvantageEnd } from "./is-yuuya-advantage-end";
import { startEvenMatchIfNeeded } from "./start-even-match-if-needed";
import { startShinyaHasAdvantageIfNeeded } from "./start-shinya-has-advantage-if-needed";
import { startYuuyaHasAdvantageIfNeeded } from "./start-yuuya-has-advantage-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastStateEventProps & ConfrontationTwoBraverProps>,
): Promise<ConfrontationTwoBraverState> {
  invisibleShoutMessageWindowWhenInputCommand(props);
  if (!props.eventState.isIntroductionComplete && !props.isRetry) {
    await introduction(props);
    return {
      ...props.eventState,
      isIntroductionComplete: true,
    };
  }

  if (await startShinyaHasAdvantageIfNeeded(props)) {
    return {
      ...props.eventState,
      chapter: {
        type: "ShinyaHasAdvantage",
      },
    };
  }

  if (await startYuuyaHasAdvantageIfNeeded(props)) {
    return {
      ...props.eventState,
      chapter: {
        type: "YuuyaHasAdvantage",
      },
    };
  }

  if (await startEvenMatchIfNeeded(props)) {
    return {
      ...props.eventState,
      chapter: {
        type: "EvenMatch",
      },
    };
  }

  if (
    isShinyaAdvantageEnd(props) ||
    isYuuyaAdvantageEnd(props) ||
    isEvenMatchEnd(props) ||
    isYuuyaActivateSkillToSurviveEnd(props) ||
    isYuuyaActivateSkillToFinishEnd(props)
  ) {
    return {
      ...props.eventState,
      chapter: {
        type: "None",
      },
    };
  }

  return props.eventState;
}
