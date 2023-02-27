import { PrivateMatchRoomID } from "@gbraver-burst-network/browser-sdk";

/** ゲストがプライベートマッチにエントリする */
export type PrivateMatchEntry = {
  type: "PrivateMatchEntry";
  /** エントリするルームID */
  roomID: PrivateMatchRoomID;
};
