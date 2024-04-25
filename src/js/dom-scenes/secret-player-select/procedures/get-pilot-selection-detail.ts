import { PilotSelectionComplete } from "../pilot-selection";

/**
 * パイロット選択状況詳細を取得する
 * @param selection 選択状況
 * @returns 選択状況詳細
 */
export const getPilotSeelctionDetail = (
  selection: PilotSelectionComplete,
): string => `${selection.selectionNumber}回選択`;
