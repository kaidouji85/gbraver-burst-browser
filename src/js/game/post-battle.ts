/** 戦闘終了後の挙動の一覧 */
export type PostBattle =
  | GotoTitle
  | NextStage
  | GotoEpisodeSelect
  | Retry
  | GotoEnding;

/** タイトルへ */
export type GotoTitle = {
  type: "GotoTitle";
};

/** 次のステージ */
export type NextStage = {
  type: "NextStage";
};

/** エピソード選択画面へ */
export type GotoEpisodeSelect = {
  type: "GotoEpisodeSelect";
};

/** リトライ */
export type Retry = {
  type: "Retry";
};

/** エンディングへ */
export type GotoEnding = {
  type: "GotoEnding";
};
