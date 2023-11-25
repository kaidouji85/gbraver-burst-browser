import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { ConfrontationTwoBraverState } from "../state";
import { introduction } from "../stories/introduction";
import { shinyaHasAdvantage } from "../stories/shinya-has-advantage";

/** beforeLastStateのプロパティ */
type Props = CustomBattleEventProps & ConfrontationTwoBraverProps;

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

  const turn = turnCount(props.stateHistory);
  if (turn === 3 && !props.state.isTurn3StartPlayed) {
    // TODO 状況に応じてストーリーを出し分ける
    await shinyaHasAdvantage(props);
    return {
      ...props.state,
      isTurn3StartPlayed: true,
    };
  }

  return props.state;
}
