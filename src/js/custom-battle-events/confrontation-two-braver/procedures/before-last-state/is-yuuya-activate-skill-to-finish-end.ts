import { CustomBattleEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { ConfrontationTwoBraverProps } from "../../props";

/**
 * チャプター「とどめをさすためにユウヤがスキルを発動する」を終了するか判定する
 * @param props イベントプロパティ
 * @returns trueで終了する
 */
export function isYuuyaActivateSkillToFinishEnd(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): boolean {
  const turn = turnCount(props.stateHistory);
  return (
    props.eventState.chapter.type === "YuuyaActivateSkillToFinish" &&
    props.eventState.chapter.startTurn < turn
  );
}
