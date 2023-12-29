import { CustomBattleEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { ConfrontationTwoBraverProps } from "../../props";

/**
 * チャプター「生き延びるためにユウヤがスキルを発動する」を終了するか判定する
 * @param props イベントプロパティ
 * @return trueで終了する
 */
export function isYuuyaActivateSkillToSurviveEnd(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): boolean {
  const turn = turnCount(props.stateHistory);
  return (
    props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
    props.state.chapter.startTurn < turn
  );
}
