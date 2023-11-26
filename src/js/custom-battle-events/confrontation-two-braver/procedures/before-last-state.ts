import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";
import { ConfrontationTwoBraverState } from "../state";
import { introduction } from "../stories/introduction";
import { invisibleEnemyCryIfNeeded } from "./invisible-enemy-cry-if-needed";
import { isChapterThatShinyaHasAdvantageEnd } from "./is-chapter-that-shinya-has-advantage-end";
import { startShinyaHasAdvantageIfNeeded } from "./start-shinya-has-advantage-if-needed";

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

  const shinyaHasAdvantage = await startShinyaHasAdvantageIfNeeded(props);
  if (shinyaHasAdvantage) {
    return {
      ...props.state,
      chapter: shinyaHasAdvantage,
    };
  }

  if (isChapterThatShinyaHasAdvantageEnd(props)) {
    return {
      ...props.state,
      chapter: {
        type: "None",
      },
    };
  }

  return props.state;
}
