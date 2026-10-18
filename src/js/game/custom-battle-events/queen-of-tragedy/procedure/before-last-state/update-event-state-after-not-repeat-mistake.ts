import { QueenOfTragedyState } from "../../state";

/**
 * 「同じ轍は踏まない」完了後のイベントステート更新
 * @param eventState 更新前のイベントステート
 * @returns 更新後のイベントステート
 */
export const updateEventStateAfterNotRepeatMistake = (
  eventState: QueenOfTragedyState,
): QueenOfTragedyState => ({
  ...eventState,
  isStoryOfTurn3Complete: true,
  chapter: { type: "None" },
});
