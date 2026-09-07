/** あいことば対戦（ホスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** あいことば対戦（ホスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** あいことば対戦（ホスト）のサブフロー */
export type PasswordMatchHostSubFlow = PlayerSelect | Battle;

/** あいことば対戦（ホスト） */
export type PasswordMatchHost = {
  type: "PasswordMatchHost";
  /** サブフロー */
  readonly passwordMatchHost: PasswordMatchHostSubFlow;
};
