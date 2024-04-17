import { ArmdozerSelectionComplete } from "../armdozer-selection";

/**
 * アームドーザ選択状況詳細を取得する
 * @param selection 選択状況
 * @return 選択状況詳細
 */
export const getArmdozerSeelctionDetail = (
  selection: ArmdozerSelectionComplete,
): string => `${selection.selectionNumber}回選択`;
