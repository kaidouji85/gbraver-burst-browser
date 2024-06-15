import { QueenOfTragedyState } from "../../state";

/**
 * ターン3開始後のイベントステート更新
 * @param eventState 更新前のイベントステート
 * @returns 更新後のイベントステート
 */
export const updateEventStateAfterStartOfTurn3 = (
  eventState: QueenOfTragedyState,
): QueenOfTragedyState => ({
  ...eventState,
  isStoryOfTurn3Complete: true,
  chapter: { type: "None" },
});
