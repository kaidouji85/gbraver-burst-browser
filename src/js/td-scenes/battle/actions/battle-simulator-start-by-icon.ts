import { PlayerId } from "gbraver-burst-core";

/** アイコン押下によりバトルシミュレーターを開始する */
export type BattleSimulatorStartByIcon = {
  type: "battleSimulatorStartByIcon";
  /** プレイヤーID */
  playerId: PlayerId;
};
