import { StateUpdateStarted } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { ConfrontationTwoBraverProps } from "../../props";
import { ConfrontationTwoBraverState } from "../../state";
import { isYuuyaSkillActivated } from "./is-yuuya-skill-activated";

/**
 * ゲームステート更新開始イベント
 * 状況に応じてイベントステートを更新する
 * @param props イベントプロパティ
 * @returns 更新後のイベントステート
 */
export function onStateUpdateStarted(
  props: Readonly<StateUpdateStarted & ConfrontationTwoBraverProps>,
): ConfrontationTwoBraverState {
  const { lastState } = props;
  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  if (
    isYuuyaSkillActivated(props) &&
    props.eventState.chapter.type !== "YuuyaActivateSkillToSurvive" &&
    isPlayerTurn
  ) {
    return {
      ...props.eventState,
      chapter: {
        type: "YuuyaActivateSkillToSurvive",
        startTurn: turnCount(props.stateHistory),
      },
    };
  }

  if (
    isYuuyaSkillActivated(props) &&
    props.eventState.chapter.type !== "YuuyaActivateSkillToFinish" &&
    !isPlayerTurn
  ) {
    return {
      ...props.eventState,
      chapter: {
        type: "YuuyaActivateSkillToFinish",
        startTurn: turnCount(props.stateHistory),
      },
    };
  }

  return props.eventState;
}
