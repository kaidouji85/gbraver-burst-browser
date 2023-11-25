import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";
import { ConfrontationTwoBraverState } from "../state";
import { introduction } from "../stories/introduction";
import { isChapterThatShinyaHasAdvantageEnd } from "./is-chapter-that-shinya-has-advantage-end";
import { startShinyaHasAdvantageIfNeeded } from "./start-shinya-has-advantage-if-needed";

/** beforeLastStateのプロパティ */
export type Props = CustomBattleEventProps & ConfrontationTwoBraverProps;

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<Props>,
): Promise<ConfrontationTwoBraverState> {
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
