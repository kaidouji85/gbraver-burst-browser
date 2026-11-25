import {
  AnonymousBattleSDK,
  AnonymousRematchRoom,
} from "@gbraver-burst-network/anonymous-browser-sdk";
import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** あいことば対戦（ゲスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** あいことば対戦（ゲスト）エントリ */
export type Entry = {
  type: "Entry";
  /** 選択したアームドーザ */
  readonly armdozerId: ArmdozerId;
  /** 選択したパイロット */
  readonly pilotId: PilotId;
};

/** あいことば対戦（ゲスト）サブフロー マッチング待ち */
export type Waiting = {
  type: "Waiting";
};

/** あいことば対戦（ゲスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
  /** バトルSDK */
  battle: AnonymousBattleSDK;
};

/** 再戦 */
export type Rematch = {
  type: "Rematch";
  /** 再戦ルーム */
  rematchRoom: AnonymousRematchRoom;
};

/** あいことば対戦（ゲスト）のサブフロー */
export type PasswordMatchGuestSubFlow =
  PlayerSelect | Entry | Waiting | Battle | Rematch;

/** あいことば対戦（ゲスト） */
export type PasswordMatchGuest = {
  type: "PasswordMatchGuest";
  /** サブフロー */
  readonly passwordMatchGuest: PasswordMatchGuestSubFlow;
};
