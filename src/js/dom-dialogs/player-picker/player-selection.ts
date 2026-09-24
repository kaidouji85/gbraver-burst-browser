import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** プレイヤー選択内容 */
export type PlayerSelection = {
  /** 選択したアームドーザID */
  armdozerId: ArmdozerId;
  /** 選択したパイロットID */
  pilotId: PilotId;
};
