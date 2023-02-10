import { PrivateMatchRoomID } from "@gbraver-burst-network/browser-core";

/** ゲストがプライベートマッチにエントリする */
export type PrivateMatchEntry = {
  type: "PrivateMatchEntry";
  /** エントリするルームID */
  roomID: PrivateMatchRoomID;
};
