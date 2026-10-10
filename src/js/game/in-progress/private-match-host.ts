import { BattleSDK, RematchRoom } from "@gbraver-burst-network/browser-sdk";

/** プライベートマッチ（ホスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** プライベートマッチ（ホスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
  /** バトルSDK */
  battle: BattleSDK;
};

/** プライベートマッチ（ホスト）サブフロー 再戦 */
export type Rematch = {
  type: "Rematch";
  /** 再戦ルーム */
  rematchRoom: RematchRoom;
};

/** プライベートマッチ（ホスト）のサブフロー */
export type PrivateMatchHostSubFlow = PlayerSelect | Battle | Rematch;

/**
 * プライベートマッチ（ホスト）
 * @template X サブフロー
 */
export type PrivateMatchHostX<X extends PrivateMatchHostSubFlow> = {
  type: "PrivateMatchHost";
  /** サブフロー */
  readonly privateMatchHost: X;
};

/** プライベートマッチ（ホスト） */
export type PrivateMatchHost = PrivateMatchHostX<PrivateMatchHostSubFlow>;
