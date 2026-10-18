import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** プレイヤーの選択情報 */
export type PlayerSelection = {
  /** 選択したアームドーザID */
  armdozerId: ArmdozerId;
  /** 選択したパイロットID */
  pilotId: PilotId;
};
