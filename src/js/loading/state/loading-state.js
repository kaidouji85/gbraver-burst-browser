// @flow

/** ローディングシーンの状態 */
export type LoadingState = {
  /** 表示、非表示フラグ、trueで表示*/
  isVisible: boolean,
  /** 0〜1で表現するローディング進捗率 */
  completedRate: number
};