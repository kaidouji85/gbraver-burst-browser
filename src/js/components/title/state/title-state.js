// @flow

/** タイトルシーンの状態 */
export type TitleState = {
  /** 表示、非表示フラグ、trueで表示する */
  isVisible: boolean,
  /** 操作可能フラグ、tureで操作可能 */
  canOperation: boolean
}