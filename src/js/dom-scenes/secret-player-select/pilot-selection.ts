import { PilotId } from "gbraver-burst-core";

/** パイロット未選択 */
export type PilotUnselected = {
  type: "PilotUnselected";
};

/** パイロット選択完了 */
export type PilotSelectionComplete = {
  type: "PilotSelectionComplete";
  /** 選択したパイロットのID */
  pilotId: PilotId;
};

/** パイロット選択状況 */
export type PilotSelection = PilotUnselected | PilotSelectionComplete;
