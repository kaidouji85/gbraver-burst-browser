// @flow

/** 戦闘終了後の挙動の一覧 */
export type PostBattle = GotoTitle | NextStage;

/** タイトルへ */
export type GotoTitle = {
  type: 'GotoTitle'
}

/** 次のステージ */
export type NextStage = {
  type: 'NextStage'
};