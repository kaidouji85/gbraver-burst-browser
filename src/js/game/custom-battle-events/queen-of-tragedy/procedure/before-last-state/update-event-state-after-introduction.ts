import { QueenOfTragedyState } from "../../state";

/**
 * イントロダクション完了後のイベントステート更新
 * @param eventState 更新前のイベントステート
 * @returns 更新後のイベントステート
 */
export const updateEventStateAfterIntroduction = (
  eventState: QueenOfTragedyState,
): QueenOfTragedyState => ({
  ...eventState,
  isIntroductionComplete: true,
});
