// @flow

/** ローディング画面のモデル */
export type LoadingModel = {
  /** 表示、非表示フラグ、trueで表示*/
  isVisible: boolean,
  /** ローディング進捗 */
  completedRate: {
    /** 表示、非表示フラグ、trueで表示*/
    isVisible: boolean,
    /** 0 - 1で表現するローディング進捗率 */
    value: number
  }
};