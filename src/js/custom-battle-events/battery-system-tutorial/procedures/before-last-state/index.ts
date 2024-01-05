import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { BatterySystemTutorialProps } from "../../props";
import { BatterySystemTutorialState } from "../../state";
import { introduction } from "../../stories/introduction";
import { doBattleDescriptionIfNeeded } from "./do-battle-description-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState> {
  const turn = turnCount(props.stateHistory);
  if (turn === 1) {
    await introduction(props);
    return props.state;
  }

  const doneBattleDescription = await doBattleDescriptionIfNeeded(props);
  if (doneBattleDescription) {
    return doneBattleDescription;
  }

  return props.state;
}
