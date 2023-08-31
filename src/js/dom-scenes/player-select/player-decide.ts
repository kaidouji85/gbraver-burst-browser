import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** プレイヤーの選択内容 */
export type PlayerDecide = {
  /** 選択したアームドーザのID */
  armdozerId: ArmdozerId;
  /** 選択したパイロットのID */
  pilotId: PilotId;
};
