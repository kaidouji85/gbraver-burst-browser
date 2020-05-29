// @flow

/** リソース読み込みアクション */
export type LoadingAction = LoadingProgress;

/** リソース読み込み中 */
export type LoadingProgress = {
  type: 'LoadingProgress',
  /** 0 - 1で表現する進捗率 */
  completedRate: number
};