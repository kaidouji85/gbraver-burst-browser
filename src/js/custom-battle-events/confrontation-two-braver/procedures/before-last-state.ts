import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";
import { ConfrontationTwoBraverState } from "../state";
import { introduction } from "../stories/introduction";

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

  return props.state;
}
