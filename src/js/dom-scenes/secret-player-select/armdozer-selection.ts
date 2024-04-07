import { ArmdozerId } from "gbraver-burst-core";

/** アームドーザ未選択 */
export type ArmdozerUnselected = {
  type: "ArmdozerUnselected";
};

/** アームドーザ選択完了 */
export type ArmdozerSelectionComplete = {
  type: "ArmdozerSelectionComplete";
  /** 選択したアームドーザのID */
  armdozerId: ArmdozerId;
  /** 再選択回数 */
  reselectionNumber: number;
};

/** アームドーザ選択状況 */
export type ArmdozerSelection = ArmdozerUnselected | ArmdozerSelectionComplete;
