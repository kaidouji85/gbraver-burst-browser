/** カジュアルマッチ */
export type CasualMatch = CasualMatchX<CasualMatchSubFlow>;

/**
 * カジュアルマッチ
 * @template X サブフロー
 */
export type CasualMatchX<X> = {
  type: "CasualMatch";
  casualMatch: X;
};

/** カジュアルマッチのサブフロー */
export type CasualMatchSubFlow = PlayerSelect | Battle;

/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
};
