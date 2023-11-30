import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";
import { ConfrontationTwoBraverState } from "../state";
import { introduction } from "../stories/introduction";
import { invisibleEnemyCryIfNeeded } from "./invisible-enemy-cry-if-needed";
import { isChapterThatEvenMatchEnd } from "./is-chapter-that-even-match-end";
import { isChapterThatShinyaHasAdvantageEnd } from "./is-chapter-that-shinya-has-advantage-end";
import { isChapterThatYuuyaHasAdvantageEnd } from "./is-chapter-that-yuuya-has-advantage-end";
import { startEvenMatchIfNeeded } from "./start-even-match-if-needed";
import { startShinyaHasAdvantageIfNeeded } from "./start-shinya-has-advantage-if-needed";
import { startYuuyaHasAdvantageIfNeeded } from "./start-yuuya-has-advantage-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & ConfrontationTwoBraverProps>,
): Promise<ConfrontationTwoBraverState> {
  invisibleEnemyCryIfNeeded(props);
  if (!props.state.isIntroductionComplete) {
    await introduction(props);
    return {
      ...props.state,
      isIntroductionComplete: true,
    };
  }

  if (await startShinyaHasAdvantageIfNeeded(props)) {
    return {
      ...props.state,
      chapter: {
        type: "ShinyaHasAdvantage",
      },
    };
  }

  if (await startYuuyaHasAdvantageIfNeeded(props)) {
    return {
      ...props.state,
      chapter: {
        type: "YuuyaHasAdvantage",
      },
    };
  }

  if (await startEvenMatchIfNeeded(props)) {
    return {
      ...props.state,
      chapter: {
        type: "EvenMatch",
      },
    }
  }

  if (
    isChapterThatShinyaHasAdvantageEnd(props) ||
    isChapterThatYuuyaHasAdvantageEnd(props) ||
    isChapterThatEvenMatchEnd(props)
  ) {
    return {
      ...props.state,
      chapter: {
        type: "None",
      },
    };
  }

  return props.state;
}
