import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** プレイヤー選択完了 */
export type SelectionComplete = {
  type: "SelectionComplete";
  /** 選択したアームドーザのID */
  armdozerId: ArmdozerId;
  /** 選択したパイロットのID */
  pilotId: PilotId;
};
