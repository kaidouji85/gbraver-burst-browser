// @flow

/** 戦闘終了後の挙動の一覧 */
export type PostBattle = GotoTitle | NextStage | GotoTutorialSelect | Retry | GotoEnding;

/** タイトルへ */
export type GotoTitle = {
  type: 'GotoTitle'
}

/** 次のステージ */
export type NextStage = {
  type: 'NextStage'
};

/** チュートリアル選択画面へ */
export type GotoTutorialSelect = {
  type: 'GotoTutorialSelect'
};

/** リトライ */
export type Retry = {
  type: 'Retry'
};

/** エンディングへ */
export type GotoEnding = {
  type: 'GotoEnding'
};