import { ArmDozerId, PilotId } from "gbraver-burst-core";

/** プレイヤー選択完了 */
export type SelectionComplete = {
  type: "SelectionComplete";
  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId;
  /** 選択したパイロットのID */
  pilotId: PilotId;
};
