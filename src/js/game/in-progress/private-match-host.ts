/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** マッチング待ち */
export type Waiting = {
  type: "Waiting";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** プライベートマッチサブフロー */
export type PrivateMatchSubFlow = PlayerSelect | Waiting | Battle;

/**
 * プライベートマッチ（ホスト）
 * @template X サブフロー
 */
export type PrivateMatchHostX<X extends PrivateMatchSubFlow> = {
  type: "PrivateMatchHost";
  /** サブフロー */
  subFlow: X;
};

/** プライベートマッチ（ホスト） */
export type PrivateMatchHost = PrivateMatchHostX<PrivateMatchSubFlow>;
