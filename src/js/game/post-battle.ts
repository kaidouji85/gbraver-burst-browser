import { ArmdozerId, PilotId } from "gbraver-burst-core";

/** 戦闘終了後の挙動の一覧 */
export type PostBattle =
  GotoTitle | NextStage | GotoEpisodeSelect | Retry | Rematch | GotoEnding;

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

/**
 * リトライ
 * お互いにまったく同じキャラクターでバトルする
 */
export type Retry = {
  type: "Retry";
};

/**
 * 再戦
 * お互いにキャラクターを選び直して再戦する
 */
export type Rematch = {
  type: "Rematch";
  /** 選択したアームドーザID */
  armdozerId: ArmdozerId;
  /** 選択したパイロットID */
  pilotId: PilotId;
};

/** エンディングへ */
export type GotoEnding = {
  type: "GotoEnding";
};
