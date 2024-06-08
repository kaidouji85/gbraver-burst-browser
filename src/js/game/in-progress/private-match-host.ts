/** プライベートマッチ（ホスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** プライベートマッチ（ホスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** プライベートマッチ（ホスト）のサブフロー */
export type PrivateMatchHostSubFlow = PlayerSelect | Battle;

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
