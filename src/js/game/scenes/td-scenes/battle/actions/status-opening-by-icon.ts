import { PlayerId } from "gbraver-burst-core";

/** アイコンを押すことでステータスを開く */
export type StatusOpeningByIcon = {
  type: "statusOpeningByIcon";
  /** ステータスを開くプレイヤー */
  playerId: PlayerId;
};
