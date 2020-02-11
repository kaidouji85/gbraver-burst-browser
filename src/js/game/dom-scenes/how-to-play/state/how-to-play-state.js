// @flow

/** 遊び方シーンの状態 */
export type HowToPlayState = {
  /** 表示・非表示フラグ、trueで表示する */
  isVisible: boolean,
  /** 操作可能フラグ、trueで操作可能 */
  canOperation: boolean,
  /** 現在表示しているページ */
  page: number,
  /** ページ最大数 */
  maxPage: number,
};