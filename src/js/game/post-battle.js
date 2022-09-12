// @flow

/** 戦闘終了後の挙動の一覧 */
export type PostBattle = GotoTitle | NextStage | NextTutorial | GotoTutorialSelect | Retry | GotoEnding;

/** タイトルへ */
export type GotoTitle = {
  type: 'GotoTitle'
}

/** 次のステージ */
export type NextStage = {
  type: 'NextStage'
};

/** @deprecated 次のチュートリアル */
export type NextTutorial = {
  type: 'NextTutorial'
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