import {
  AnonymousBattleSDK,
  AnonymousRematchRoom,
} from "@gbraver-burst-network/anonymous-browser-sdk";

/** あいことば対戦（ホスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** あいことば対戦（ホスト）サブフロー 戦闘中 */
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

/** あいことば対戦（ホスト）のサブフロー */
export type PasswordMatchHostSubFlow = PlayerSelect | Battle | Rematch;

/** あいことば対戦（ホスト） */
export type PasswordMatchHost = {
  type: "PasswordMatchHost";
  /** サブフロー */
  readonly passwordMatchHost: PasswordMatchHostSubFlow;
};
