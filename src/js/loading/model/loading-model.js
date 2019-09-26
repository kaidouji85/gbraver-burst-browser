// @flow

/** ローディング画面のモデル */
export type LoadingModel = {
  /** 表示、非表示フラグ、trueで表示*/
  isVisible: boolean,
  /** 注釈 */
  caption: {
    /** 表示、非表示フラグ、trueで表示*/
    isVisible: boolean,
    /** 注釈の内容 */
    value: string
  },
  /** ローディング進捗 */
  completedRate: {
    /** 表示、非表示フラグ、trueで表示*/
    isVisible: boolean,
    /** 0 - 1で表現するローディング進捗率 */
    value: number
  }
};