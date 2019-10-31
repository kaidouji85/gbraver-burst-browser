// @flow

/** リソース読み込みアクション */
export type LoadingAction = LoadingStart | LoadingProgress | LoadingComplete;

/** 読み込み開始 */
export type LoadingStart = {
  type: 'LoadingStart'
};

/** リソース読み込み中 */
export type LoadingProgress = {
  type: 'LoadingProgress',
  /** 0 - 1で表現する進捗率 */
  completedRate: number
};

/** リソース読み込み完了 */
export type LoadingComplete = {
  type : 'LoadingComplete',
};