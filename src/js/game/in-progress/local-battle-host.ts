/** ローカル対戦（ホスト）サブフロー キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** ローカル対戦（ホスト）サブフロー 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** ローカル対戦（ホスト）のサブフロー */
export type LocalBattleHostSubFlow = PlayerSelect | Battle;

/** ローカル対戦（ホスト） */
export type LocalBattleHost = {
  type: "LocalBattleHost";
  /** サブフロー */
  readonly localBattleHost: LocalBattleHostSubFlow;
};
