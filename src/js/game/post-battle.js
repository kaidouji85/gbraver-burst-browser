// @flow

/** 戦闘終了後の挙動の一覧 */
export type PostBattle = GotoTitle | NextStage | Retry | GotoEnding;

/** タイトルへ */
export type GotoTitle = {
  type: 'GotoTitle'
}

/** 次のステージ */
export type NextStage = {
  type: 'NextStage'
};

/** リトライ */
export type Retry = {
  type: 'Retry'
};

/** エンディングへ */
export type GotoEnding = {
  type: 'GotoEnding'
};