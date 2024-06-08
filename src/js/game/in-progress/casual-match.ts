/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** カジュアルマッチのサブフロー */
export type CasualMatchSubFlow = PlayerSelect | Battle;

/**
 * カジュアルマッチ
 * @template X サブフロー
 */
export type CasualMatchX<X> = {
  type: "CasualMatch";
  readonly casualMatch: X;
};

/** カジュアルマッチ */
export type CasualMatch = CasualMatchX<CasualMatchSubFlow>;
