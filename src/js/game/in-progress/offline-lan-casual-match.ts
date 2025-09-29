/** キャラ選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** 戦闘中 */
export type Battle = {
  type: "Battle";
};

/** カジュアルマッチ（オフラインLAN）のサブフロー */
export type OfflineLANCasualMatchSubFlow = PlayerSelect | Battle;

/**
 * カジュアルマッチ（オフラインLAN）
 * @template X サブフロー
 */
export type OfflineLANCasualMatch = {
  type: "OfflineLANCasualMatch";
  /** サブフロー */
  readonly offlineLANCasualMatch: OfflineLANCasualMatchSubFlow;
};
