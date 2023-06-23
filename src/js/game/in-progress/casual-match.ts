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
export type CasualMatchSubFlow = PlayerSelect | Waiting | Battle;

/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** @deprecated マッチング待ち */
export type Waiting = {
  type: "Waiting";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
};
